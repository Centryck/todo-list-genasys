import { ChangeTodoTaskStateUseCase } from './change-todo-task-state-use-case';
import { TodoTaskRepository } from '../../domain/repository/todo-task-repository';
import { TodoTask } from '../../domain/entity/todo-task';

	let todoTaskRepository: jest.Mocked<TodoTaskRepository>;
  let useCase: ChangeTodoTaskStateUseCase;

	describe('ChangeTodoTaskStateUseCase', () => {
  beforeEach(() => {
    todoTaskRepository = {
      getAllTodoTasks: jest.fn(),
      createTodoTask: jest.fn(),
      deleteTodoTask: jest.fn(),
      changeTodoTaskState: jest.fn(),
    };
    useCase = new ChangeTodoTaskStateUseCase(todoTaskRepository);
  });

  it('should change the state of a task successfully', async () => {
    const mockTasks: TodoTask[] = [
      { id: 1, label: 'Task 1', checked: false },
      { id: 2, label: 'Task 2', checked: true },
    ];
    const params = { id: 1, checked: true };
    todoTaskRepository.changeTodoTaskState.mockResolvedValue(mockTasks);

    const result = await useCase.execute(params);

    expect(todoTaskRepository.changeTodoTaskState).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockTasks);
  });

  it('should throw an error when trying to change the state of a non-existing task', async () => {
    const params = { id: 999, checked: true };
    const mockError = new Error('Invalid id');
    todoTaskRepository.changeTodoTaskState.mockRejectedValue(mockError);

    await expect(useCase.execute(params)).rejects.toThrow('Invalid id');
    expect(todoTaskRepository.changeTodoTaskState).toHaveBeenCalledWith(params);
  });
});
