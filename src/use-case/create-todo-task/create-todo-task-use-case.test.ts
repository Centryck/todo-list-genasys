import { CreateTodoTaskUseCase } from './create-todo-task-use-case';
import { TodoTaskRepository, CreateTodoTaskParams } from '../../domain/repository/todo-task-repository';
import { TodoTask } from '../../domain/entity/todo-task';

let todoTaskRepository: jest.Mocked<TodoTaskRepository>;
let useCase: CreateTodoTaskUseCase;

describe('CreateTodoTaskUseCase', () => {

  beforeEach(() => {
    todoTaskRepository = {
      getAllTodoTasks: jest.fn(),
      createTodoTask: jest.fn(),
      deleteTodoTask: jest.fn(),
      changeTodoTaskState: jest.fn(),
    };
    useCase = new CreateTodoTaskUseCase(todoTaskRepository);
  });

  it('should create a new task successfully', async () => {
    const params: CreateTodoTaskParams = { label: 'New Task' };
    const newTask: TodoTask = { id: 1, label: 'New Task', checked: false };
    todoTaskRepository.createTodoTask.mockResolvedValue(newTask);

    const result = await useCase.execute(params);

    expect(todoTaskRepository.createTodoTask).toHaveBeenCalledWith(params);
    expect(result).toEqual(newTask);
  });

  it('should throw an error if task creation fails', async () => {
    const params: CreateTodoTaskParams = { label: 'New Task' };
    const mockError = new Error('task creation failed');
    todoTaskRepository.createTodoTask.mockRejectedValue(mockError);

    await expect(useCase.execute(params)).rejects.toThrow('task creation failed');
    expect(todoTaskRepository.createTodoTask).toHaveBeenCalledWith(params);
  });
});
