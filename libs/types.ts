import React from "react";

export type TQueueItem = {
  id: number;
  status: string;
  result: string;
};

export type TFieldList = {
  [key: string]: React.ReactNode;
};

export type TValues = {
  [key: string]: any;
};

export type TColors = {
  [key: string]: string;
};

export interface IContext {
  [key: string]: any;
}

export type TQueue = TQueueItem[];

type Option = {
  value: string;
  title: string;
};

export type TField = {
  type: string;
  name: string;
  title: string;
  items: Option[];
};

export type TResult = {
  type: string;
  name: string;
  title: string;
};

interface IParameters {
  input: TField[];
  output: TResult[];
}

export interface IConfig {
  name?: string;
  title?: string;
  description?: string;
  parameters?: IParameters;
}
