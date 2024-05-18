import { useState } from "react";
import { CreateTodoTaskUseCase } from "../../use-case/create-todo-task/create-todo-task-use-case";
import { TodoTaskRepositoryImpl } from "../../data/repository/todo-task-repository-impl";
import { TodoTask } from "../../domain/entity/todo-task";
import { CreateTodoTaskParams } from "../../domain/repository/todo-task-repository";

const todoTaskRepositoryImpl = new TodoTaskRepositoryImpl();
const createTodoTaskUseCase = new CreateTodoTaskUseCase(todoTaskRepositoryImpl);

interface UseCreateTodoTaskReturn {
  isLoading: boolean;
  error?: string;
  createTodoTask: (
    newTask: CreateTodoTaskParams
  ) => Promise<TodoTask | undefined>;
}

export const useCreateTodoTask = (): UseCreateTodoTaskReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const createTodoTask = async (props: CreateTodoTaskParams) => {
    setIsLoading(true);

    return createTodoTaskUseCase
      .execute(props)
      .then((createdTask) => {
        return createdTask;
      })
      .catch((err) => {
        setError("Error on createTodoTask" + err);
        return undefined;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    createTodoTask,
    isLoading,
    error,
  };
};
