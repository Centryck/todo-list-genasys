import { renderHook } from "@testing-library/react-hooks";
import { useGetTodoTasks } from "./use-get-todo-tasks";
import { GetAllTodoTasksUseCase } from "../../use-case/get-all-todo-tasks/get-all-todo-tasks";

// Mock dependencies
jest.mock("../../use-case/get-all-todo-tasks/get-all-todo-tasks");
const mockGetAllTodoTasksUseCase = GetAllTodoTasksUseCase as jest.MockedClass<
  typeof GetAllTodoTasksUseCase
>;

describe("useGetTodoTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useGetTodoTasks());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.tasks).toEqual([]);
    expect(result.current.totalTasks).toBe(0);
  });

  it("should fetch tasks successfully", async () => {
    const mockTasks = [
      { id: 1, label: "Task 1", checked: false },
      { id: 2, label: "Task 2", checked: true },
    ];
    const mockResponse = { tasks: mockTasks, totalTasksCount: 2 };
    mockGetAllTodoTasksUseCase.prototype.execute.mockResolvedValueOnce(
      mockResponse
    );

    const { result, waitForNextUpdate } = renderHook(() => useGetTodoTasks());

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.tasks).toEqual(mockTasks);
    expect(result.current.totalTasks).toBe(2);
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Test error");
    mockGetAllTodoTasksUseCase.prototype.execute.mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() => useGetTodoTasks());

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Error on getTodoTasks");
    expect(result.current.tasks).toEqual([]);
    expect(result.current.totalTasks).toBe(0);
  });
});
