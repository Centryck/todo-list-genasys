import { useState } from "react";
import { TodoTaskRepositoryImpl } from "../../data/repository/todo-task-repository-impl";
import { TodoTask } from "../../domain/entity/todo-task";
import { ChangeTodoTaskStateParams } from "../../domain/repository/todo-task-repository";
import { ChangeTodoTaskStateUseCase } from "../../use-case/change-todo-task-state/change-todo-task-state-use-case";

const todoTaskRepositoryImpl = new TodoTaskRepositoryImpl();
const changeTodoTaskStateUseCase = new ChangeTodoTaskStateUseCase(
  todoTaskRepositoryImpl
);

interface UseChangeTodoTaskState {
  isLoading: boolean;
  error?: string;
  changeTodoTaskState: (
    task: ChangeTodoTaskStateParams
  ) => Promise<TodoTask[] | undefined>;
}

export const useChangeTodoTask = (): UseChangeTodoTaskState => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const changeTodoTaskState = async (props: ChangeTodoTaskStateParams) => {
    setIsLoading(true);

    return changeTodoTaskStateUseCase
      .execute(props)
      .then((updatedTasks) => {
        return updatedTasks;
      })
      .catch((err) => {
        setError("Error on ChangeTodoTaskState" + err);
        return undefined;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    changeTodoTaskState,
    isLoading,
    error,
  };
};
