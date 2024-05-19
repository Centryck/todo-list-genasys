import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoListPage from "./";
import { useGetTodoTasks } from "../../aplication/use-get-todo-tasks/use-get-todo-tasks";
import { useDeleteTodoTask } from "../../aplication/use-delete-todo-task/use-delete-todo-task";
import { useCreateTodoTask } from "../../aplication/use-create-todo-task/use-create-todo-task";
import { useChangeTodoTaskState } from "../../aplication/use-change-todo-task-state/use-change-todo-task-state";
import { TodoTask } from "../../domain/entity/todo-task";

jest.mock("../../aplication/use-get-todo-tasks/use-get-todo-tasks");
jest.mock("../../aplication/use-delete-todo-task/use-delete-todo-task");
jest.mock("../../aplication/use-create-todo-task/use-create-todo-task");
jest.mock(
  "../../aplication/use-change-todo-task-state/use-change-todo-task-state"
);

const errorMessage = "Failed to load tasks";

const mockTasks: TodoTask[] = [
  { id: 1, label: "Task 1", checked: false },
  { id: 2, label: "Task 2", checked: true },
];

const renderElement = () => {
  const utils = render(<TodoListPage />);

  const query = {
    // Components to be rendered:
    todoForm: () => screen.queryByTestId("todo-form-component"),
    todoList: () => screen.queryByTestId("todo-list-component"),
    todoResults: () => screen.queryByTestId("todo-results-component"),
    loading: () => screen.queryByText("Loading..."),
    error: () => screen.queryByText(errorMessage),

    // Inputs and buttons:
    input: () => screen.queryByPlaceholderText("Enter new task"),
    addButton: () => screen.queryByText("Add task"),
    deleteButtons: () => screen.queryAllByTestId("delete-button"),
    toggleButtons: () => screen.queryAllByTestId("checkbox-button"),
    taskByText: (text: string) => screen.queryByText(text),
  };

  return {
    ...utils,
    query,
  };
};

describe("TodoListPage", () => {
  beforeEach(() => {
    (useGetTodoTasks as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      isLoading: false,
      error: null,
      totalTasks: mockTasks.length,
    });

    (useDeleteTodoTask as jest.Mock).mockReturnValue({
      isLoading: false,
      deleteTodoTask: jest.fn().mockResolvedValue(true),
    });

    (useCreateTodoTask as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      createTodoTask: jest
        .fn()
        .mockResolvedValue({ id: 3, label: "Task 3", checked: false }),
    });

    (useChangeTodoTaskState as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTodoTaskState: jest.fn().mockResolvedValue([
        { id: 1, label: "Task 1", checked: true },
        { id: 2, label: "Task 2", checked: true },
      ]),
    });
  });

  it("should render correctly", () => {
    const { query } = renderElement();

    expect(query.todoForm()).not.toBeNull();
    expect(query.todoList()).not.toBeNull();
    expect(query.todoResults()).not.toBeNull();
  });

  it("should show loading state and error message", () => {
    (useGetTodoTasks as jest.Mock).mockReturnValueOnce({
      tasks: [],
      isLoading: true,
      error: errorMessage,
      totalTasks: 0,
    });

    const { query } = renderElement();

    expect(query.loading()).not.toBeNull();
    expect(query.error()).not.toBeNull();
  });

  it("should create a new task", async () => {
    const { query } = renderElement();

    fireEvent.change(query.input()!, { target: { value: "New Task" } });

    await waitFor(async () => {
      fireEvent.click(query.addButton()!);
    });

    await waitFor(() => {
      expect(query.taskByText("Task 3")).not.toBeNull();
    });
  });

  it("should delete a task", async () => {
    const { query } = renderElement();

    const deleteButtons = query.deleteButtons();

    await waitFor(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(query.taskByText("Task 1")).toBeNull();
    });
  });

  it("should toggle task state", async () => {
    const { query } = renderElement();

    const toggleButtons = query.toggleButtons();

    await waitFor(async () => {
      fireEvent.click(toggleButtons[0]);
    });

    await waitFor(() => {
      expect(query.taskByText("Task 1")).not.toBeNull();
    });
  });
});
