import express, { Express } from "express";
import spec from "./spec.json";
import cors from "cors";
import child_process from "child_process";
import bodyParser from "body-parser";
import { TQueue, TQueueItem, TValues } from "@/libs/types";

(async () => {
  const server = require("http").createServer();
  const wsServer = require("ws").Server;
  const clients: TValues = {};
  const app: Express = express();
  let queue: TQueue = [];
  let running = false;

  const runScript = () => {
    running = true;
    let firstItem = queue.find((it) => it.status === "await");
    if (!firstItem) {
      return (running = false);
    }
    child_process.exec(firstItem.result, (error, result) => {
      if (error) {
        firstItem!.result = error.toString();
        firstItem!.status = "error";
      } else {
        firstItem!.result = result.toString();
        firstItem!.status = "ready";
      }
      for (let key in clients) {
        clients[key].send(JSON.stringify(firstItem));
      }
      queue = queue.map((it) =>
        it.id === firstItem!.id ? firstItem : it
      ) as TQueue;
      return runScript();
    });
  };

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/config", (req, res) => res.status(200).json(spec as any));
  app.get("/queue", (req, res) => res.status(200).json(queue as any));

  app.post("/run", (req, res) => {
    let item = {
      id: new Date().getTime(),
      status: "await",
      result: `${__dirname}/start.sh ${Object.values(req.body).join(" ")}`,
    } as TQueueItem;
    queue.push(item);
    for (let key in clients) {
      clients[key].send(JSON.stringify(item));
    }
    res.status(200).end();
    if (!running) {
      runScript();
    }
  });

  server.on("request", app);

  const ws = new wsServer({ server });
  ws.on("connection", (ws: any) => {
    let id = new Date().getTime();
    clients[id] = ws;
    ws.on("close", function () {
      delete clients[id];
    });
  });

  server.listen(8080, async () => {
    console.log(`express server started, http://localhost:8080/`);
  });
})();
