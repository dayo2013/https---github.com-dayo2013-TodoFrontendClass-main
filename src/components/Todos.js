import React, { useContext } from "react";
import { todosContext } from "../App";
import Todo from "./Todo";

const Todos = () => {
  const { todos } = useContext(todosContext);
  
  return (
    <ul>
      {!!todos.length &&
        todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </ul>
  );
};

const CompletedTodos = () => {
  const { todos } = useContext(todosContext);
  const completedTodos = todos.filter(todo => todo.completed);
  
  return (
    <ul>
      {!!todos.length &&
        completedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </ul>
  );
};

export default Todos;
