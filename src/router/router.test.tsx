import React from "react";
import Router from "./";
import { render, screen } from "@testing-library/react";

const renderElement = ({ route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  const utils = render(<Router />);

  const query = {
    todoListPage: () => screen.queryByTestId("todo-list-page"),
    wrongPage: () => screen.queryByText("404"),
  };

  return {
    ...utils,
    query,
  };
};

describe("Router", () => {
  it("should render TodoListPage as default page", () => {
    const { query } = renderElement();

    expect(query.todoListPage()).not.toBeNull();
  });

  it("should render a 404 if route is wrong", () => {
    const route = "/todolist/1";

    const { query } = renderElement({ route });

    expect(query.wrongPage()).not.toBeNull();
  });
});
