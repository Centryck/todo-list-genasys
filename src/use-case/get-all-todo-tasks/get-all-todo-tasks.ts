import { GetAllData, TodoTaskRepository } from '../../domain/repository/todo-task-repository';
import { UseCase } from '../utils';

export class GetAllTodoTasksUseCase implements UseCase<undefined, Promise<GetAllData>> {
  todoTaskRepository: TodoTaskRepository;

  constructor(todoTaskRepository: TodoTaskRepository) {
    this.todoTaskRepository = todoTaskRepository;
  }

  async execute(): Promise<GetAllData> {
    return this.todoTaskRepository.getAllTodoTasks()
  }
}