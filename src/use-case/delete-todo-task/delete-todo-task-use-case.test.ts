import { DeleteTodoTaskUseCase } from './delete-todo-task-use-case';
import { TodoTaskRepository, DeleteTodoTaskParams } from '../../domain/repository/todo-task-repository';

let todoTaskRepository: jest.Mocked<TodoTaskRepository>;
let useCase: DeleteTodoTaskUseCase;

describe('DeleteTodoTaskUseCase', () => {

  beforeEach(() => {
    todoTaskRepository = {
      getAllTodoTasks: jest.fn(),
      createTodoTask: jest.fn(),
      deleteTodoTask: jest.fn(),
      changeTodoTaskState: jest.fn(),
    };
    useCase = new DeleteTodoTaskUseCase(todoTaskRepository);
  });

  it('should delete a task successfully', async () => {
    const params: DeleteTodoTaskParams = { id: 1 };
    todoTaskRepository.deleteTodoTask.mockResolvedValue(undefined);

    const result = await useCase.execute(params);

    expect(todoTaskRepository.deleteTodoTask).toHaveBeenCalledWith(params);
    expect(result).toBeUndefined();
  });

  it('should throw an error if delete fails', async () => {
    const params: DeleteTodoTaskParams = { id: 1 };
    const mockError = new Error('delete task failed');
    todoTaskRepository.deleteTodoTask.mockRejectedValue(mockError);

    await expect(useCase.execute(params)).rejects.toThrow('delete task failed');
    expect(todoTaskRepository.deleteTodoTask).toHaveBeenCalledWith(params);
  });
});
