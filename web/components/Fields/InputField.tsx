import { TField } from "@/libs/types";
import React, { FC, memo } from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  field: TField;
  control: any;
  type: string;
  rules: any;
}

const InputField: FC<Props> = ({ field, control, rules, type }) => {
  return (
    <Controller
      rules={rules}
      name={field.name}
      control={control}
      render={({ value, onChange }) => (
        <Input
          role={field.name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default memo(InputField);
