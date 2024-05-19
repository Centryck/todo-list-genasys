import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm, { TodoFormProps } from "./";

const onCreateTaskMock = jest.fn();
const errorMock = "Oops! An error has occurred";

const renderElement = (props?: Partial<TodoFormProps>) => {
  const utils = render(
    <TodoForm onCreateTask={onCreateTaskMock} error={undefined} {...props} />
  );

  const query = {
    input: () => screen.queryByPlaceholderText("Enter new task"),
    addButton: () => screen.queryByText("Add task"),
    errorMessage: () => screen.queryByText(errorMock),
  };

  return {
    ...utils,
    query,
  };
};

describe("TodoForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input and button by default", () => {
    const { query } = renderElement();

    expect(query.input()).not.toBeNull();
    expect(query.addButton()).not.toBeNull();
    expect(query.errorMessage()).toBeNull();
  });

  it("should call onCreateTask with input value when form is submitted", () => {
    const { query } = renderElement();

    fireEvent.change(query.input()!, { target: { value: "New Task" } });
    fireEvent.click(query.addButton()!);

    expect(onCreateTaskMock).toHaveBeenCalledTimes(1);
    expect(onCreateTaskMock).toHaveBeenCalledWith("New Task");
    expect(query.input()).toHaveProperty("value", "");
  });

  it("should clear input after task is added", () => {
    const { query } = renderElement();

    fireEvent.change(query.input()!, { target: { value: "New Task" } });
    fireEvent.click(query.addButton()!);

    expect(query.input()).toHaveProperty("value", "");
  });

  it("should display error message when error prop is provided", () => {
    const { query } = renderElement({ error: errorMock });

    expect(query.errorMessage()).not.toBeNull();
  });

  it("should handle Enter key to submit the form", () => {
    const { query } = renderElement();

    fireEvent.change(query.input()!, { target: { value: "New Task" } });

    //first should not call
    fireEvent.keyUp(query.input()!, {
      key: "notEnter",
      code: "notEnter",
      charCode: 21,
    });

    expect(onCreateTaskMock).not.toHaveBeenCalled();

    //when enter is pressed should call
    fireEvent.keyUp(query.input()!, {
      key: "enter",
      code: "Enter",
      charCode: 13,
    });

    expect(onCreateTaskMock).toHaveBeenCalledTimes(1);
    expect(onCreateTaskMock).toHaveBeenCalledWith("New Task");
    expect(query.input()).toHaveProperty("value", "");
  });

  it("should not call onCreateTask if input is empty", () => {
    const { query } = renderElement();

    fireEvent.click(query.addButton()!);

    expect(onCreateTaskMock).not.toHaveBeenCalled();
  });
});
