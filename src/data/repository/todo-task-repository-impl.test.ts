import { TodoTaskRepositoryImpl } from './todo-task-repository-impl';
import { TodoTask } from '../../domain/entity/todo-task';

const mockTasks: TodoTask[] = [
  { id: 1, label: 'Task 1', checked: false },
  { id: 2, label: 'Task 2', checked: true },
];

describe('TodoTaskRepositoryImpl', () => {
  let repository: TodoTaskRepositoryImpl;

  beforeEach(() => {
    repository = new TodoTaskRepositoryImpl();
    localStorage.clear();
    localStorage.setItem('tasks', JSON.stringify({ tasks: mockTasks }));
    localStorage.setItem('totalTasksCount', JSON.stringify(mockTasks.length));
  });

  it('should get all tasks', async () => {
    const result = await repository.getAllTodoTasks();
    expect(result.tasks).toEqual(mockTasks);
    expect(result.totalTasksCount).toBe(mockTasks.length);
  });

	it('should get empty array', async () => {
		localStorage.clear();

    const result = await repository.getAllTodoTasks();

		expect(localStorage.getItem("tasks")).toBeNull();
		expect(localStorage.getItem("totalTasksCount")).toBeNull();

    expect(result.tasks).toEqual([]);
    expect(result.totalTasksCount).toBe(0);
  });

  it('should create a new task', async () => {
    const newTaskLabel = 'New Task';
    const newTask = await repository.createTodoTask({ label: newTaskLabel });

    expect(newTask.id).toBe(mockTasks.length + 1);
    expect(newTask.label).toBe(newTaskLabel);
    expect(newTask.checked).toBe(false);

    const tasks = JSON.parse(localStorage.getItem('tasks') ?? '').tasks;
    expect(tasks.length).toBe(mockTasks.length + 1);
    expect(tasks.find((task: TodoTask) => task.id === newTask.id)).toEqual(newTask);
  });

  it('should delete a task', async () => {
    const taskIdToDelete = 1;
    await repository.deleteTodoTask({ id: taskIdToDelete });

    const tasks = JSON.parse(localStorage.getItem('tasks') ?? '').tasks;
    expect(tasks.length).toBe(mockTasks.length - 1);
    expect(tasks.find((task: TodoTask) => task.id === taskIdToDelete)).toBeUndefined();
  });

  it('should change the state of a task', async () => {
    const taskIdToChange = 1;
    const newCheckedState = true;
    const updatedTasks = await repository.changeTodoTaskState({ id: taskIdToChange, checked: newCheckedState });

    const task = updatedTasks.find(task => task.id === taskIdToChange);
    expect(task).toBeDefined();
    expect(task?.checked).toBe(newCheckedState);

    const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks') ?? '').tasks;
    const taskInLocalStorage = tasksInLocalStorage.find((task: TodoTask) => task.id === taskIdToChange);
    expect(taskInLocalStorage).toBeDefined();
    expect(taskInLocalStorage?.checked).toBe(newCheckedState);
  });

  it('should throw an error if trying to change the state of a non-existing task', async () => {
    await expect(repository.changeTodoTaskState({ id: 999, checked: true })).rejects.toThrow('Invalid id');
  });
});
