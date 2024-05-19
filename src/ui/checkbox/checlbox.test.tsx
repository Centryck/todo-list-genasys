import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox, { CheckboxProps } from "./";

const labelMock = "mock";
const checkedMock = false;
const onClickMock = jest.fn();
const onDeleteMock = jest.fn();

const renderElement = (props?: Partial<CheckboxProps>) => {
  const utils = render(
    <Checkbox
      label={labelMock}
      checked={checkedMock}
      onClick={onClickMock}
      onDelete={onDeleteMock}
      {...props}
    />
  );

  const query = {
    checkboxItem: () => screen.queryByTestId("checkbox-item"),
    checkboxButton: () => screen.queryByTestId("checkbox-button"),
    deleteButton: () => screen.queryByTestId("delete-button"),
    label: () => screen.queryByText(labelMock),
  };

  return {
    ...utils,
    query,
  };
};

describe("Checkbox", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render by default", () => {
    const { query } = renderElement();

    expect(query.checkboxItem()).not.toBeNull();
    expect(query.checkboxButton()).not.toBeNull();
    expect(query.deleteButton()).not.toBeNull();
    expect(query.label()).not.toBeNull();

    expect(query.checkboxButton()).toHaveProperty("checked", false);
  });

  it("should call onClick when checkbox is clicked", () => {
    const { query } = renderElement();

    fireEvent.click(query.checkboxButton()!);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete when delete button is clicked", () => {
    const { query } = renderElement();

    fireEvent.click(query.deleteButton()!);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });

  it("should render checked state correctly", () => {
    const { query } = renderElement({ checked: true });

    expect(query.checkboxButton()).toHaveProperty("checked", true);
  });
});
