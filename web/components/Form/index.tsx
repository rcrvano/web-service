import React, { FC, memo, useCallback, useMemo } from "react";
import { TField, TValues, TFieldList } from "@/libs/types";
import SelectField from "@/web/components/Fields/SelectField";
import InputField from "@/web/components/Fields/InputField";
import { useForm } from "react-hook-form";
import { Form as AntdForm, Button } from "antd";

interface Props {
  fields: TField[];
}

const isFilled = (values: TValues, countFields: number): boolean => {
  if (countFields !== Object.keys(values).length) {
    return false;
  }
  for (let key in values) {
    if (!values[key]) {
      return false;
    }
  }
  return true;
};

const Form: FC<Props> = ({ fields }) => {
  const fieldList: TFieldList = {
    number: InputField,
    select: SelectField,
  };
  const { control, watch, handleSubmit } = useForm();
  const values: TValues = watch(fields.map(({ name }) => name));

  const isValid = useMemo(() => isFilled(values, fields.length), [
    values,
    fields,
  ]);

  const onSubmit = useCallback((data: TValues) => {
    fetch("http://localhost:8080/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    } as any);
  }, []);

  let Field = undefined;
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => {
          Field = fieldList[field.type] as any;
          return (
            <AntdForm.Item label={field.name} key={field.name}>
              <Field
                type={field.type}
                rules={{ required: true }}
                control={control}
                field={field}
              />
            </AntdForm.Item>
          );
        })}

        {isValid && (
          <AntdForm.Item>
            <Button role="submitBtn" type="primary" htmlType="submit">
              Запустить
            </Button>
          </AntdForm.Item>
        )}
      </form>
    </div>
  );
};

export default memo(Form);
