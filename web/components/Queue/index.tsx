import React, { FC, useContext } from "react";
import { Timeline, Empty } from "antd";
import { Context } from "@/web/context";
import { TColors, TQueueItem } from "@/libs/types";

const Queue: FC = () => {
  const {
      state: { queue },
    } = useContext(Context),
    colors: TColors = {
      await: "blue",
      ready: "green",
      error: "red",
    };

  if (queue.length === 0) {
    return (
      <div className="wrapper">
        <Empty description="Пустая очередь" />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Timeline>
        {queue.map((it: TQueueItem) => (
          <Timeline.Item color={colors[it.status]} key={it.id}>
            [{it.status}]:{it.result}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default Queue;
