import React from "react";
import { render, screen } from "@testing-library/react";
import TotalTasksCountComponent, { TotalTasksCountComponentProps } from "./";

const totalTaskCountMock = 5;

const renderElement = (props?: Partial<TotalTasksCountComponentProps>) => {
  const utils = render(
    <TotalTasksCountComponent totalTaskCount={totalTaskCountMock} {...props} />
  );

  const query = {
    totalTasksText: () => screen.queryByText("Total tasks created:"),
    totalTaskCount: () => screen.queryByText("5"),
  };

  return {
    ...utils,
    query,
  };
};

describe("TodoResults", () => {
  it("should render total task count correctly", () => {
    const { query } = renderElement();

    expect(query.totalTasksText()).not.toBeNull();
    expect(query.totalTaskCount()).not.toBeNull();
  });
});
