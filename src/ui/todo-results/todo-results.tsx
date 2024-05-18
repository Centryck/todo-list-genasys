import * as React from "react";
import "./todo-results.scss";

interface TodoResultsProps {
  totalTaskCount: number;
}

const TodoResults: React.FC<TodoResultsProps> = ({ totalTaskCount }) => {
  return (
    <div className="todo-results">
      <span>Total tasks created:</span>
      <p>{totalTaskCount}</p>
    </div>
  );
};

export default TodoResults;
