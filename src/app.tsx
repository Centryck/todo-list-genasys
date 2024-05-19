import React from "react";
import Router from "./router";
import "./index.scss";

export const App = () => {
  return (
    <div className="root" data-testid={"root"}>
      <Router />
    </div>
  );
};
