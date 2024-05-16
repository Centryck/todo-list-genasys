import { TodoTask } from '../../domain/entity/todo-task';
import {
    ChangeTodoTaskStateParams,
    CreateTodoTaskParams, 
    DeleteTodoTaskParams, 
    TodoTaskRepository, 
} from '../../domain/repository/todo-task-repository';

const defaultTodoTasks: TodoTask[] = [
  {
    id: 0,
    label: "Fix an ability to display all tasks",
    checked: false
  },
  {
    id: 1,
    label: "Fix a layout, checkboxes should be listed in a column",
    checked: false
  },
  {
    id: 2,
    label: "Fix an ability to add a new task",
    checked: false
  },
  {
    id: 3,
    label: "Fix an ability to toggle a task",
    checked: false
  },
  {
    id: 4,
    label: "Fix an ability to delete a task",
    checked: false
  },
  {
    id: 5,
    label: "Fix an ability to count completed tasks",
    checked: false
  }
];

export class TodoTaskRepositoryImpl implements TodoTaskRepository {
  tasks: TodoTask[]

  constructor() {
    this.tasks = defaultTodoTasks;
  }

  get totalTasksCount () {
    return this.tasks.length
  }
  get pendingTasksCount () {
    return this.tasks.filter(task => !task.checked).length
  }
  get doneTasksCount () {
    return this.tasks.filter(task => task.checked).length
  }

  getAllTodoTasks() {
      return Promise.resolve(this.tasks)
  }

  createTodoTask({ label }: CreateTodoTaskParams): Promise<TodoTask> {
    const id = this.totalTasksCount + 1
    const newTodoTask: TodoTask = {
      id,
      label,
      checked: false
    }
    this.tasks.push(newTodoTask)
    
    return Promise.resolve(newTodoTask)
  }

  deleteTodoTask({ id }: DeleteTodoTaskParams): Promise<void> {
    this.tasks = this.tasks.filter(task => task.id === id)
    return Promise.resolve()
  }

  changeTodoTaskState({ id, checked }: ChangeTodoTaskStateParams): Promise<TodoTask> {
    const index = this.tasks.findIndex(task => task.id === id);

    if (index === -1) {
      return Promise.reject(new Error('Invalid id'));
    }

    this.tasks[index].checked = checked;

    return Promise.resolve(this.tasks[index]);
  }
}