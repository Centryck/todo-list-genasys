import React, { useState, useContext } from "react";
import { TodosContext } from "../../todo-context";
import { TodoTask } from "../../domain/entity/todo-task";

import "./todo-form.scss";

export const TodoForm = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [task, setTask] = useState<string>();

  const handleAddTodo = () => {
    todos.length
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
