import { IContext, TQueue, TQueueItem } from "@/libs/types";
import React, {FC, ReactNode, useCallback, useState} from "react";

const context: IContext = { queue: [] };
export const Context = React.createContext(context);

interface Props {
  children: ReactNode;
}

const ws = new WebSocket("ws://localhost:8080");

const ContextProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState(context);
  const setQueue = useCallback((queue: TQueue) => {
    setState({ ...state, queue });
  }, []);

  ws.onmessage = ({ data }) => {
    let newItem = JSON.parse(data) as TQueueItem;
    let find = false;
    let newQueue: TQueueItem[] = state.queue.map((it: TQueueItem) => {
      if (it.id !== newItem.id) {
        return it;
      }
      find = true;
      return newItem;
    });
    if (!find) {
      newQueue = [newItem, ...newQueue];
    }
    setQueue(newQueue);
  };

  return (
    <Context.Provider value={{ state, setQueue }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
