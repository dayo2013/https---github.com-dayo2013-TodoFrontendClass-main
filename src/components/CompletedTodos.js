import { todosContext } from "../App";
import Todo from "./Todo";
import React, { useContext } from "react";



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
  
  export default CompletedTodos;
  