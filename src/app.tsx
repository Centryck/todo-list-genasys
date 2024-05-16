import React from "react";
import Router from "./router";
import "./index.scss";

interface Todo {
  id: number;
  label: string;
  checked: boolean;
}

const todosTemplate: Todo[] = [
  {
    id: 0,
    label: "Fix an ability to display all tasks",
    checked: false
  },
  {
    id: 1,
    label: "Fix a layout, checkboxes should be listed in a column",
    checked: false
  },
  {
    id: 2,
    label: "Fix an ability to add a new task",
    checked: false
  },
  {
    id: 3,
    label: "Fix an ability to toggle a task",
    checked: false
  },
  {
    id: 4,
    label: "Fix an ability to delete a task",
    checked: false
  },
  {
    id: 5,
    label: "Fix an ability to count completed tasks",
    checked: false
  }
];

export const App = () => {

  return (
    <div className="root">
        <Router />
    </div>
  );
};
