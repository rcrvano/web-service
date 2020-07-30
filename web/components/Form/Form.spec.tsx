import React from "react";
import Form from "./index";
import { TField } from "@/libs/types";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import "@/libs/prototype";

describe("Form", () => {
  it("Visual: Button invisible", () => {
    const mockFields: TField[] = [
      {
        name: "test",
        type: "number",
        title: "test field",
      } as TField,
    ];

    const { container } = render(<Form fields={mockFields} />);

    expect(container.querySelector("button")).toBeNull();
  });

  it("Visual: Button visible", () => {
    const mockFields: TField[] = [
      {
        name: "test",
        type: "number",
        title: "test field",
      } as TField,
    ];

    const { getByRole } = render(<Form fields={mockFields} />);
    fireEvent.change(getByRole("test"), {
      target: { value: 123 },
    });

    expect(getByRole("submitBtn")).toBeVisible();
  });
});
