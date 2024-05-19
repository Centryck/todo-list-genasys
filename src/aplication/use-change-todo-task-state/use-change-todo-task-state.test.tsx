import { renderHook, act } from "@testing-library/react-hooks";
import { useChangeTodoTaskState } from "./use-change-todo-task-state";
import { ChangeTodoTaskStateUseCase } from "../../use-case/change-todo-task-state/change-todo-task-state-use-case";
import { TodoTask } from "../../domain/entity/todo-task";

// Mock dependencies
jest.mock(
  "../../use-case/change-todo-task-state/change-todo-task-state-use-case"
);
const mockChangeTodoTaskStateUseCase =
  ChangeTodoTaskStateUseCase as jest.MockedClass<
    typeof ChangeTodoTaskStateUseCase
  >;

describe("useChangeTodoTaskState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useChangeTodoTaskState());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should set isLoading to true when changeTodoTaskState is called", async () => {
    const { result } = renderHook(() => useChangeTodoTaskState());

    act(() => {
      result.current.changeTodoTaskState({ id: 1, checked: true });
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should handle success case correctly", async () => {
    const mockUpdatedTasks: TodoTask[] = [
      { id: 1, label: "Task 1", checked: false },
    ];
    mockChangeTodoTaskStateUseCase.prototype.execute.mockResolvedValueOnce(
      mockUpdatedTasks
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useChangeTodoTaskState()
    );

    act(() => {
      result.current.changeTodoTaskState({ id: 1, checked: false });
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should handle error case correctly", async () => {
    const mockError = new Error("Test error");
    mockChangeTodoTaskStateUseCase.prototype.execute.mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useChangeTodoTaskState()
    );

    act(() => {
      result.current.changeTodoTaskState({ id: 1, checked: false });
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(
      `Error on ChangeTodoTaskState${mockError}`
    );
  });
});
