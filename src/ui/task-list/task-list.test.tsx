import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList, { TaskListProps } from "./";
import { TodoTask } from "../../domain/entity/todo-task";

const tasksMock: TodoTask[] = [
  { id: 1, label: "mock", checked: false },
  { id: 2, label: "mock 2", checked: true },
  { id: 3, label: "mock 3", checked: false },
];

const titleMock = "Tasks";
const emptyTextMock = "No tasks available";

const onDeleteTaskMock = jest.fn();
const onToggleCheckMock = jest.fn();

const renderElement = (props?: Partial<TaskListProps>) => {
  const utils = render(
    <TaskList
      tasks={tasksMock}
      title={titleMock}
      emptyText={emptyTextMock}
      onDeleteTask={onDeleteTaskMock}
      onToggleCheck={onToggleCheckMock}
      {...props}
    />
  );

  const query = {
    title: () => screen.queryByText(`${titleMock} ${tasksMock.length}`),
    emptyText: () => screen.queryByText(emptyTextMock),
    taskItems: () => screen.queryAllByRole("listitem"),
    deleteButton: () => screen.queryAllByTestId(`delete-button`)[0],
    toggleButton: () => screen.queryAllByTestId(`checkbox-button`)[0],
  };

  return {
    ...utils,
    query,
  };
};

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render by default", () => {
    const { query } = renderElement();

    expect(query.title()).not.toBeNull();
    expect(query.emptyText()).toBeNull();

    expect(query.taskItems()).toHaveLength(tasksMock.length);

    tasksMock.forEach((task) => {
      expect(screen.queryByText(task.label)).not.toBeNull();
    });
  });

  it("should call onDelete when delete button is clicked", () => {
    const { query } = renderElement();

    fireEvent.click(query.deleteButton());
    expect(onDeleteTaskMock).toHaveBeenCalledTimes(1);
    expect(onDeleteTaskMock).toHaveBeenCalledWith(1);
  });

  it("should call onToggle when checkbox button is clicked", () => {
    const { query } = renderElement();

    fireEvent.click(query.toggleButton());
    expect(onToggleCheckMock).toHaveBeenCalledTimes(1);
    expect(onToggleCheckMock).toHaveBeenCalledWith(1, true);
  });

  it("should render empty text when there are no tasks", () => {
    const { query } = renderElement({ tasks: [] });

    expect(query.emptyText()).not.toBeNull();
  });
});
