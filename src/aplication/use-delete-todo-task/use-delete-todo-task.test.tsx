import { renderHook, act } from "@testing-library/react-hooks";
import { useDeleteTodoTask } from "./use-delete-todo-task";
import { DeleteTodoTaskUseCase } from "../../use-case/delete-todo-task/delete-todo-task-use-case";

// Mock dependencies
jest.mock("../../use-case/delete-todo-task/delete-todo-task-use-case");
const mockDeleteTodoTaskUseCase = DeleteTodoTaskUseCase as jest.MockedClass<
  typeof DeleteTodoTaskUseCase
>;

describe("useDeleteTodoTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useDeleteTodoTask());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should set isLoading to true when deleteTodoTask is called", async () => {
    const { result } = renderHook(() => useDeleteTodoTask());

    act(() => {
      result.current.deleteTodoTask({ id: 1 });
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should handle success case correctly", async () => {
    mockDeleteTodoTaskUseCase.prototype.execute.mockResolvedValueOnce(
      undefined
    );

    const { result, waitForNextUpdate } = renderHook(() => useDeleteTodoTask());

    act(() => {
      result.current.deleteTodoTask({ id: 1 });
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should handle error case correctly", async () => {
    const mockError = new Error("Test error");
    mockDeleteTodoTaskUseCase.prototype.execute.mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() => useDeleteTodoTask());

    act(() => {
      result.current.deleteTodoTask({ id: 1 });
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(`Error on deleteTodoTask${mockError}`);
  });
});
