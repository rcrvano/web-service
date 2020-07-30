import React, { FC, useContext, useEffect, useState } from "react";
import Form from "@/web/components/Form";
import Queue from "@/web/components/Queue";
import { IConfig } from "@/libs/types";
import { Context } from "./context";
import { Row, Col } from "antd";

const App: FC = () => {
  const [config, setConfig] = useState<IConfig>({}),
    [isLoading, setLoading] = useState(true),
    [isError, setError] = useState(false),
    {
      setQueue,
      state: { queue },
    } = useContext(Context);

  useEffect(() => {
    fetch("http://localhost:8080/config")
      .then(async (res) => setConfig(await res.json()))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    fetch("http://localhost:8080/queue")
      .then(async (res) => {
        setQueue((await res.json()).reverse());
      })
      .catch(() => setError(true));
  }, []);

  if (isError) {
    return <div>Произошла ошибка</div>;
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container">
      <Row>
        <Col span={24}>
            <h1>Отложенный запуск</h1>
        </Col>
        <Col span={12}>
          <Form fields={config.parameters ? config.parameters.input : []} />
        </Col>
        <Col span={12}>
          <Queue />
        </Col>
      </Row>
    </div>
  );
};

export default App;
