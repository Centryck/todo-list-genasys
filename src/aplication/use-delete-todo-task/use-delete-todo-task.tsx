import { useState } from "react";
import { DeleteTodoTaskUseCase } from "../../use-case/delete-todo-task/delete-todo-task-use-case";
import { TodoTaskRepositoryImpl } from "../../data/repository/todo-task-repository-impl";
import { DeleteTodoTaskParams } from "../../domain/repository/todo-task-repository";

const todoTaskRepositoryImpl = new TodoTaskRepositoryImpl();
const deleteTodoTaskUseCase = new DeleteTodoTaskUseCase(todoTaskRepositoryImpl);

interface UseDeleteTodoTaskReturn {
  isLoading: boolean;
  error?: string;
  deleteTodoTask: (deletedTask: DeleteTodoTaskParams) => Promise<undefined>;
}

export const useDeleteTodoTask = (): UseDeleteTodoTaskReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const deleteTodoTask = async (props: DeleteTodoTaskParams) => {
    setIsLoading(true);

    return deleteTodoTaskUseCase
      .execute(props)
      ?.catch((err) => {
        setError("Error on deleteTodoTask" + err);
        return undefined;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    deleteTodoTask,
    isLoading,
    error,
  };
};
