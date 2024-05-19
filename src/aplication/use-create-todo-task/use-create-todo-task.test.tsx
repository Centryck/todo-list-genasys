import { renderHook, act } from "@testing-library/react-hooks";
import { useCreateTodoTask } from "./use-create-todo-task";
import { CreateTodoTaskUseCase } from "../../use-case/create-todo-task/create-todo-task-use-case";
import { TodoTask } from "../../domain/entity/todo-task";

// Mock dependencies
jest.mock("../../use-case/create-todo-task/create-todo-task-use-case");
const mockCreateTodoTaskUseCase = CreateTodoTaskUseCase as jest.MockedClass<
  typeof CreateTodoTaskUseCase
>;

describe("useCreateTodoTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCreateTodoTask());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should set isLoading to true when createTodoTask is called", async () => {
    const { result } = renderHook(() => useCreateTodoTask());

    act(() => {
      result.current.createTodoTask({ label: "new task" });
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should handle success case correctly", async () => {
    const mockCreatedTask: TodoTask = {
      id: 1,
      label: "Task 1",
      checked: false,
    };
    mockCreateTodoTaskUseCase.prototype.execute.mockResolvedValueOnce(
      mockCreatedTask
    );

    const { result, waitForNextUpdate } = renderHook(() => useCreateTodoTask());

    act(() => {
      result.current.createTodoTask({ label: "new task" });
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should handle error case correctly", async () => {
    const mockError = new Error("Test error");
    mockCreateTodoTaskUseCase.prototype.execute.mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() => useCreateTodoTask());

    act(() => {
      result.current.createTodoTask({ label: "new task" });
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(`Error on createTodoTask${mockError}`);
  });
});
