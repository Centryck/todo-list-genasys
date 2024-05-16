import { TodoTaskRepository, DeleteTodoTaskParams } from '../../domain/repository/todo-task-repository';
import { UseCase } from '../utils';

export class DeleteTodoTaskUseCase implements UseCase<DeleteTodoTaskParams, Promise<void>> {
  constructor(private readonly todoTaskRepository: TodoTaskRepository) {}

  public async execute(params: DeleteTodoTaskParams): Promise<void> {
    return this.todoTaskRepository.deleteTodoTask(params)
  }
}