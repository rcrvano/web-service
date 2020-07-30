import { TField } from "@/libs/types";
import React, { FC, memo } from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  field: TField;
  control: any;
  rules: any;
}

const SelectField: FC<Props> = ({ field, control, rules }) => {
  return (
    <Controller
      rules={rules}
      name={field.name}
      control={control}
      render={({ value, onChange }) => (
        <Select value={value} onChange={onChange}>
          {field.items.map((it, index) => (
            <Select.Option key={index} value={it.value}>
              {it.title}
            </Select.Option>
          ))}
        </Select>
      )}
    />
  );
};

export default memo(SelectField);
