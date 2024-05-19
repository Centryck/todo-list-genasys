import React, { useState } from "react";
import "./todo-form.scss";

export interface TodoFormProps {
  onCreateTask: (taskLabel: string) => void;
  error?: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ onCreateTask, error }) => {
  const [taskLabel, setTaskLabel] = useState<string>("");

  const handleAddTodo = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (taskLabel) {
      onCreateTask(taskLabel);
      setTaskLabel("");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "enter") {
      handleAddTodo(e);
    }
  };

  return (
    <div className="todo-form" data-testid={"todo-form-component"}>
      <form onSubmit={(e) => handleAddTodo(e)}>
        <input
          className="todo-form-input"
          placeholder="Enter new task"
          value={taskLabel}
          onChange={(e) => setTaskLabel(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <button type="submit" className="todo-form-button">
          Add task
        </button>
      </form>

      {error && (
        <div className="error">
          <p>Oops! An error has occurred</p>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
