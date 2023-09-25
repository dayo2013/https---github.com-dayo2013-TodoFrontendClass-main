import React, { useContext } from "react";
import { todosContext } from "../App";
import Todo from "./Todo";

const Todos = () => {
  const { todos } = useContext(todosContext);
  
  return (
    <ul>
      {todos.length === 0 ? "NO AVAILBLE TODOS" : !!todos.length &&
        todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </ul>
  );
};

export const CompletedTodos = () => {
  const { todos } = useContext(todosContext);
  const completedTodos = todos.filter(todo => todo.completed);
  
  return (
    <ul>
      {completedTodos.length === 0 ? "NO COMPLETED TODOS" : !!completedTodos.length &&
        completedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </ul>
  );
};

export default Todos;
