import React, { useEffect, useState } from "react";
import TodoForm from "../../ui/todo-form";
import TodoList from "../../ui/todo-list";
import TodoResults from "../../ui/todo-results";
import { useGetTodoTasks } from "../../aplication/use-get-todo-tasks/use-get-todo-tasks";
import { TodoTask } from "../../domain/entity/todo-task";
import { useDeleteTodoTask } from "../../aplication/use-delete-todo-task/use-delete-todo-task";
import { useCreateTodoTask } from "../../aplication/use-create-todo-task/use-create-todo-task";
import { useChangeTodoTask } from "../../aplication/use-change-todo-task-state/use-change-todo-task-state";
import "./todo-list-page.scss";

const TodoListPage = () => {
  const {
    tasks: initialTasks,
    isLoading: isLoadingTasks,
    error: loadTasksError,
    totalTasks,
  } = useGetTodoTasks();

  const { isLoading: isLoadingDeleteProcess, deleteTodoTask } =
    useDeleteTodoTask();

  const {
    isLoading: isLoadingCreateProcess,
    error: createError,
    createTodoTask,
  } = useCreateTodoTask();

  const { isLoading: isLoadingChangeStateProcess, changeTodoTaskState } =
    useChangeTodoTask();

  const [currentTasks, setCurrentTasks] = useState<TodoTask[]>([]);
  const [totalTaskCount, setTotalTasksCount] = useState<number>(0);

  const isLoading =
    isLoadingTasks ||
    isLoadingCreateProcess ||
    isLoadingDeleteProcess ||
    isLoadingChangeStateProcess;

  useEffect(() => {
    if (!isLoadingTasks) {
      setTotalTasksCount(totalTasks);
      return setCurrentTasks(initialTasks);
    }
  }, [isLoadingTasks]);

  const handleCreateTask = async (taskLabel: string) => {
    const createdTask = await createTodoTask({ label: taskLabel });

    if (createdTask) {
      setCurrentTasks([...currentTasks, createdTask]);
      setTotalTasksCount(totalTaskCount + 1);
    }
  };

  const handleDeleteTask = async (id: number) => {
    deleteTodoTask({ id }).then(() => {
      setCurrentTasks(currentTasks.filter((task) => task.id !== id));
    });
  };

  const handleToggleCheck = async (id: number, checked: boolean) => {
    changeTodoTaskState({ id, checked }).then((updatedTasks) => {
      if (updatedTasks) {
        setCurrentTasks(updatedTasks);
      }
    });
  };

  return (
    <div className="todo-list-page">
      <div className="todo-list-page-body">
        <TodoForm
          onCreateTask={(taskLabel: string) => handleCreateTask(taskLabel)}
          error={createError}
        />
        <div className="todo-list-page-content">
          <TodoList
            tasks={currentTasks}
            isLoading={isLoading}
            error={loadTasksError}
            onDeleteTask={(id: number) => handleDeleteTask(id)}
            onToggleCheck={(id: number, checked: boolean) =>
              handleToggleCheck(id, checked)
            }
          />

          <div className="todo-list-page-total-count">
            <TodoResults totalTaskCount={totalTaskCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;
