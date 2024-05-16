import * as React from "react";
import { Checkbox } from "../../components/checkbox";
import { TodosContext } from "../../todo-context";
import "./todo-list.scss";
import { TodoTask } from "../../domain/entity/todo-task";
import { useGetTodoTasks } from "../../aplication/use-get-todo-tasks/use-get-todo-tasks";

export const TodoList = () => {
  const { tasks } = useGetTodoTasks()

  const handleDelete = (id: number) => {
    // Fix an ability to delete task
  };

  const toggleCheck = (id: number) => {
    // Fix an ability to toggle task
  };

  const handleKeyUp = (e: { keyCode: number; }, id: number) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {tasks.length ? (
        <div className="todo-list-content">
          {tasks.map((todoItem: TodoTask) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e: { keyCode: number; }) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">
          Looks like you&apos;re absolutely free today!
        </div>
      )}
    </div>
  );
};
