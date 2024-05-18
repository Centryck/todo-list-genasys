import { TodoTaskRepository, DeleteTodoTaskParams } from '../../domain/repository/todo-task-repository';
import { UseCase } from '../utils';

export class DeleteTodoTaskUseCase implements UseCase<DeleteTodoTaskParams, Promise<undefined>> {
  todoTaskRepository: TodoTaskRepository
  
  constructor(todoTaskRepository: TodoTaskRepository) {
    this.todoTaskRepository = todoTaskRepository;
  }

  execute(params: DeleteTodoTaskParams): Promise<undefined> {
    return this.todoTaskRepository.deleteTodoTask(params)
  }
}