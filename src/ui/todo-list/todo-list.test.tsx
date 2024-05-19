import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList, { TodoListProps } from "./";

const tasksMock = [
  { id: 1, label: "mock", checked: false },
  { id: 2, label: "mock 2", checked: true },
  { id: 3, label: "mock 3", checked: false },
];

const isLoadingMock = false;
const errorMessageMock = "Error";

const onDeleteTaskMock = jest.fn();
const onToggleCheckMock = jest.fn();

const renderElement = (props?: Partial<TodoListProps>) => {
  const utils = render(
    <TodoList
      tasks={tasksMock}
      isLoading={isLoadingMock}
      onDeleteTask={onDeleteTaskMock}
      onToggleCheck={onToggleCheckMock}
      error={undefined}
      {...props}
    />
  );

  const query = {
    // Task Lists:
    pendingTasks: () => screen.queryByText("Things to do: 2"), //2 is the number of pending tasks in the mock list
    completedTasks: () => screen.queryByText("Completed tasks: 1"), //1 is the number of done tasks in the mock list

    emptyPendingTasks: () =>
      screen.queryByText("Looks like you're absolutely free today!"),
    emptyCompletedTasks: () =>
      screen.queryByText("It looks like you haven't completed any tasks yet."),

    //loading and error messages
    loading: () => screen.queryByText("Loading..."),
    error: () => screen.queryByText(errorMessageMock),

    // Task Item:
    taskItem: () => screen.queryAllByTestId("checkbox-item"),
    deleteButton: () => screen.queryAllByTestId("delete-button")[0],
    toggleButton: () => screen.queryAllByTestId("checkbox-button")[0],
  };

  return {
    ...utils,
    query,
  };
};

describe("TodoList", () => {
  it("should render by default", () => {
    const { query } = renderElement();

    expect(query.pendingTasks()).not.toBeNull();
    expect(query.completedTasks()).not.toBeNull();

    expect(query.emptyPendingTasks()).toBeNull();
    expect(query.emptyCompletedTasks()).toBeNull();

    expect(query.loading()).toBeNull();
    expect(query.error()).toBeNull();

    expect(query.taskItem()).not.toBeNull();
    expect(query.deleteButton()).not.toBeNull();
    expect(query.toggleButton()).not.toBeNull();
  });

  it("should call onDelete when button is clicked", () => {
    const { query } = renderElement();

    fireEvent.click(query.deleteButton());
    expect(onDeleteTaskMock).toHaveBeenCalledTimes(1);
    expect(onDeleteTaskMock).toHaveBeenCalledWith(1);
  });

  it("should call onToggle when button is clicked", () => {
    const { query } = renderElement();

    fireEvent.click(query.toggleButton());
    expect(onToggleCheckMock).toHaveBeenCalledTimes(1);
    expect(onToggleCheckMock).toHaveBeenCalledWith(1, true);
  });

  it("should render empty text when there are no tasks", () => {
    const { query } = renderElement({ tasks: [] });

    expect(query.emptyPendingTasks()).not.toBeNull();
    expect(query.emptyCompletedTasks()).not.toBeNull();
  });

  it("should render loading when isLoading is true", () => {
    const { query } = renderElement({ isLoading: true });
    expect(query.loading()).not.toBeNull();
  });

  it("should render error when there is an error", () => {
    const { query } = renderElement({ error: errorMessageMock });
    expect(query.error()).not.toBeNull();
  });
});
