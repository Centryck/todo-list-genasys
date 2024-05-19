import { GetAllTodoTasksUseCase } from './get-all-todo-tasks';
import { TodoTaskRepository } from '../../domain/repository/todo-task-repository';

let todoTaskRepository: jest.Mocked<TodoTaskRepository>;
let useCase: GetAllTodoTasksUseCase;

describe('GetAllTodoTasksUseCase', () => {

  beforeEach(() => {
    todoTaskRepository = {
      getAllTodoTasks: jest.fn(),
      createTodoTask: jest.fn(),
      deleteTodoTask: jest.fn(),
      changeTodoTaskState: jest.fn(),
    };
    useCase = new GetAllTodoTasksUseCase(todoTaskRepository);
  });

  it('should get all tasks successfully', async () => {
    const mockTasks = [{ id: 1, label: 'Task 1', checked: false }];
    const mockTotalTasksCount = 1;
    const getAllData = { tasks: mockTasks, totalTasksCount: mockTotalTasksCount };
    todoTaskRepository.getAllTodoTasks.mockResolvedValue(getAllData);

    const result = await useCase.execute();

    expect(todoTaskRepository.getAllTodoTasks).toHaveBeenCalled();
    expect(result).toEqual(getAllData);
  });

  it('should throw an error if task loading fails', async () => {
    const mockError = new Error('Task loading failed');
    todoTaskRepository.getAllTodoTasks.mockRejectedValue(mockError);

    await expect(useCase.execute()).rejects.toThrow('Task loading failed');
    expect(todoTaskRepository.getAllTodoTasks).toHaveBeenCalled();
  });
});
