import { TodoTask } from "../../domain/entity/todo-task";
import {
  ChangeTodoTaskStateParams,
  CreateTodoTaskParams,
  DeleteTodoTaskParams,
  TodoTaskRepository,
} from "../../domain/repository/todo-task-repository";


const getTasksFromLocalStorage = (): TodoTask[] => {
  if (localStorage.getItem("tasks")) {
    return JSON.parse(localStorage.getItem("tasks") ?? "")?.tasks;
  }

  return [];
};

const getTotalTasksCountFromLocalStorage = (): number => {
  if (localStorage.getItem("totalTasksCount")) {
    return JSON.parse(localStorage.getItem("totalTasksCount") ?? "");
  }

  return 0;
};

export class TodoTaskRepositoryImpl implements TodoTaskRepository {
  getAllTodoTasks() {
    return Promise.resolve({
      tasks: getTasksFromLocalStorage(),
      totalTasksCount: getTotalTasksCountFromLocalStorage(),
    });
  }

  createTodoTask({ label }: CreateTodoTaskParams): Promise<TodoTask> {
    const id = getTotalTasksCountFromLocalStorage() + 1;
    const newTodoTask: TodoTask = {
      id,
      label,
      checked: false,
    };

    localStorage.setItem("totalTasksCount", JSON.stringify(id));
    localStorage.setItem(
      "tasks",
      JSON.stringify({ tasks: [...getTasksFromLocalStorage(), newTodoTask] })
    );

    return Promise.resolve(newTodoTask);
  }

  deleteTodoTask({ id }: DeleteTodoTaskParams): Promise<undefined> {
    const updatedTasks = getTasksFromLocalStorage().filter(
      (task) => task.id !== id
    );
    localStorage.setItem("tasks", JSON.stringify({ tasks: updatedTasks }));

    return Promise.resolve(undefined);
  }

  changeTodoTaskState({
    id,
    checked,
  }: ChangeTodoTaskStateParams): Promise<TodoTask[]> {
    let tasks = getTasksFromLocalStorage();
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return Promise.reject(new Error("Invalid id"));
    }

    tasks[index].checked = checked;
    localStorage.setItem("tasks", JSON.stringify({ tasks }));

    return Promise.resolve(tasks);
  }
}
