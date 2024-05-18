import React from "react";
import "./todo-list.scss";
import { TodoTask } from "../../domain/entity/todo-task";
import TaskList from "../task-list";

interface TodoListProps {
  tasks?: TodoTask[];
  isLoading: boolean;
  error?: string;
  onDeleteTask: (id: number) => void;
  onToggleCheck: (id: number, checked: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  isLoading,
  error,
  onDeleteTask,
  onToggleCheck,
}) => {
  const handleDelete = (id: number) => {
    onDeleteTask(id);
  };

  const handleToggleCheck = (id: number, checked: boolean) => {
    onToggleCheck(id, checked);
  };

  const pendingTasks = tasks?.length
    ? tasks.filter((todoItem) => todoItem.checked === false)
    : [];
  const completedTasks = tasks?.length
    ? tasks.filter((todoItem) => todoItem.checked === true)
    : [];

  const pendingTasksTitle = "Things to do:";
  const noPendingTasks = "Looks like you're absolutely free today!";

  const completedTasksTitle = "Completed tasks:";
  const noCompletedTasks = "It looks like you haven't completed any tasks yet.";

  return (
    <div className="todo-list">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <TaskList
        tasks={pendingTasks}
        title={pendingTasksTitle}
        onDeleteTask={handleDelete}
        onToggleCheck={handleToggleCheck}
        emptyText={noPendingTasks}
      />

      <TaskList
        tasks={completedTasks}
        title={completedTasksTitle}
        onDeleteTask={handleDelete}
        onToggleCheck={handleToggleCheck}
        emptyText={noCompletedTasks}
      />
    </div>
  );
};

export default TodoList;
