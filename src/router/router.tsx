import React from "react";
import Paths from "./paths";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "../pages/todo-list-page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Home} element={<TodoList />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
