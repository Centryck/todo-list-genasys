import * as React from "react";
import "./total-tasks-count-component.scss";

export interface TotalTasksCountComponentProps {
  totalTaskCount: number;
}

const TotalTasksCountComponent: React.FC<TotalTasksCountComponentProps> = ({
  totalTaskCount,
}) => {
  return (
    <div className="todo-results" data-testid={"todo-results-component"}>
      <span>Total tasks created:</span>
      <p>{totalTaskCount}</p>
    </div>
  );
};

export default TotalTasksCountComponent;
