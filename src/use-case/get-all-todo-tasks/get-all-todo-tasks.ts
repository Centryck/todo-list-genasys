import { TodoTask } from '../../domain/entity/todo-task';
import { TodoTaskRepository } from '../../domain/repository/todo-task-repository';
import { UseCase } from '../utils';

export class GetAllTodoTasksUseCase implements UseCase<undefined, Promise<TodoTask[]>> {
  todoTaskRepository: TodoTaskRepository;

  constructor(todoTaskRepository: TodoTaskRepository) {
    this.todoTaskRepository = todoTaskRepository;
  }

  async execute(): Promise<TodoTask[]> {
    return this.todoTaskRepository.getAllTodoTasks()
  }
}