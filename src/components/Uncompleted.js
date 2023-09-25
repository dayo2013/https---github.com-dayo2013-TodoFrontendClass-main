
import Todo from "./Todo";
import { todosContext } from "../App";
import React, { useContext } from "react";




const UncompletedTodos = () => {
    const { todos } = useContext(todosContext);
    const uncompletedTodos = todos.filter(todo => !todo.completed);
    
    return (
      <ul>
        {!!todos.length &&
          uncompletedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)}
      </ul>
    );
  };
  
  export default UncompletedTodos;
  