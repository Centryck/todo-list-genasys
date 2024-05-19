import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./app";

const renderElement = () => {
  const utils = render(<App />);

  const query = {
    routerRender: () => screen.queryByTestId("root"),
  };

  return {
    ...utils,
    query,
  };
};

describe("App component", () => {
  it("renders by default", () => {
    const { query } = renderElement();

    expect(query.routerRender()).not.toBeNull();
  });
});
