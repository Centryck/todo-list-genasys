import { TodoTask } from "../entity/todo-task"

  export interface CreateTodoTaskParams {
    label: string;
  }

  export interface DeleteTodoTaskParams {
    id: number;
  }

  export interface ChangeTodoTaskStateParams {
    id: number;
    checked: boolean;
  }

  export interface GetAllData {
    tasks: TodoTask[];
    totalTasksCount: number;
  }

  export interface TodoTaskRepository {
    createTodoTask(params: CreateTodoTaskParams): Promise<TodoTask>
    deleteTodoTask(params: DeleteTodoTaskParams): Promise<undefined>
    changeTodoTaskState(params: ChangeTodoTaskStateParams): Promise<TodoTask[]>
    getAllTodoTasks(): Promise<GetAllData>
  }
