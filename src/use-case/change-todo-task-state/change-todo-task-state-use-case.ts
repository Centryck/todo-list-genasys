import { TodoTask } from '../../domain/entity/todo-task';
import { TodoTaskRepository, ChangeTodoTaskStateParams } from '../../domain/repository/todo-task-repository';
import { UseCase } from '../utils';

export class ChangeTodoTaskStateUseCase implements UseCase<ChangeTodoTaskStateParams, Promise<TodoTask[]>> {
  todoTaskRepository: TodoTaskRepository
  
  constructor(todoTaskRepository: TodoTaskRepository) {
    this.todoTaskRepository = todoTaskRepository;
  }

    async execute(params: ChangeTodoTaskStateParams): Promise<TodoTask[]> {
    return this.todoTaskRepository.changeTodoTaskState(params)
  }
}