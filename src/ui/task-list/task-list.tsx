import React from "react";
import Checkbox from "../checkbox/checkbox";
import "./task-list.scss";
import { TodoTask } from "../../domain/entity/todo-task";

export interface TaskListProps {
  tasks: TodoTask[];
  title: string;
  emptyText: string;
  onDeleteTask: (id: number) => void;
  onToggleCheck: (id: number, checked: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  title,
  emptyText,
  onDeleteTask,
  onToggleCheck,
}) => {
  const numTasks = tasks.length;

  const handleDelete = (id: number) => {
    onDeleteTask(id);
  };

  const toggleCheck = (id: number, checked: boolean) => {
    onToggleCheck(id, checked);
  };

  return (
    <div className="pending-todo-list">
      <span className="todo-list-title">
        {title} {numTasks}
      </span>
      {tasks?.length ? (
        <ul className="todo-list-items">
          {tasks.map((todoItem) => (
            <li key={todoItem.id} className="todo-list-item">
              <Checkbox
                key={todoItem.id}
                label={todoItem.label}
                checked={todoItem.checked}
                onClick={() => toggleCheck(todoItem.id, !todoItem.checked)}
                onDelete={() => handleDelete(todoItem.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-todos">{emptyText}</p>
      )}
    </div>
  );
};

export default TaskList;
