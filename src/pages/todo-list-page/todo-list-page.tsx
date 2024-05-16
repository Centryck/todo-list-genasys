import React from 'react';
import { TodoForm } from "../../ui/todo-form";
import { TodoList } from "../../ui/todo-list";
import { TodoResults } from "../../ui/todo-results";

const TodoListPage = () => {

    return (
        <div>
            <TodoForm />
            <TodoList />
            <TodoResults />
        </div>
    )
}

export default TodoListPage;