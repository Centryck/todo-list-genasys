import { TodoTask } from '../../domain/entity/todo-task';
import { TodoTaskRepository, CreateTodoTaskParams } from '../../domain/repository/todo-task-repository';
import { UseCase } from '../utils';

export class CreateTodoTaskUseCase implements UseCase<CreateTodoTaskParams, Promise<TodoTask>> {
  constructor(private readonly todoTaskRepository: TodoTaskRepository) {}

  public async execute(params: CreateTodoTaskParams): Promise<TodoTask> {
    return this.todoTaskRepository.createTodoTask(params)
  }
}