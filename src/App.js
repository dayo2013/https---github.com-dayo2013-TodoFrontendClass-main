import { createContext, useEffect, useRef } from "react";
import "./App.css";
import { useState } from "react";
import Todos from "./components/Todos";
import TodoInput from "./components/TodoInput";
import CompletedTodos from "./components/CompletedTodos";
import UncompletedTodos from "./components/Uncompleted";


 
export const todosContext = createContext();


function App() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [hidden1,sethiden1] = useState(true);
  const [hidden2,sethiden2] = useState(false)
  const [hidden3,sethiden3] = useState(false)
  const todoRef = useRef(null);

  useEffect(() => {
    let canceled = false;
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        if (!canceled) {
          setTodos(data.slice(0, 10));
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => (canceled = true);
  }, []);

  const handleCheck = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  };

  const handleEdit = (e) => {
    const newTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: e.target.value } : todo
    );
    setTodos(newTodos);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { title: todoRef.current.value, completed: false, id: todos.length + 1 },
    ]);
  };

  const hiddenfunc1 = () =>{
    sethiden1(true);
    sethiden2(false);
    sethiden3(false);
  };
  const hiddenfunc2 = () =>{
    sethiden1(false);
    sethiden2(true);
    sethiden3(false);
  };
  const hiddenfunc3 = () =>{
    sethiden1(false);
    sethiden2(false);
    sethiden3(true);
  };



  return (
    //The context provider is used to make these properties available.
     //to all descendant components. This makes it easy to share 
     <todosContext.Provider
      value={{
        todos,
        editId,
        todoRef,
        handleCheck,
        //between components without having to pass props down the component tree.
        handleDelete,
        handleEdit,
        setEditId,
        handleCreate,
      }}
    >
      <div className="App">
        <div className="todo-create">
          <TodoInput />
        </div>
        <div className=" max-w-sm mx-auto">
          <div class="border-b border-gray-200 dark:border-gray-700">
  <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
    <button
     type="button"
     class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 active"
      id="tabs-with-underline-item-1"
      data-hs-tab="#tabs-with-underline-1"
      aria-controls="tabs-with-underline-1"
      role="tab"
      onClick={hiddenfunc1}>
      All
    </button>
    <button type="button"
     class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600"
      id="tabs-with-underline-item-2" 
      data-hs-tab="#tabs-with-underline-2" 
      aria-controls="tabs-with-underline-2"
       role="tab" onClick={hiddenfunc2}>
      Complete
    </button>
    <button type="button" 
    class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600" 
    id="tabs-with-underline-item-3" 
    data-hs-tab="#tabs-with-underline-3" 
    aria-controls="tabs-with-underline-3" 
    role="tab" onClick={hiddenfunc3}>
      Uncompleted
    </button>
  </nav>
</div>

<div class="mt-3">
  <div id="tabs-with-underline-1" className={!hidden1 && "hidden"} role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
    <p class="text-gray-500 dark:text-gray-400">
       <em class="font-semibold text-gray-800 dark:text-gray-200"></em> 
    </p>
    <Todos/>
  </div>
  <div id="tabs-with-underline-2" className={!hidden2 && "hidden"} role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
    <p class="text-gray-500 dark:text-gray-400">
       <em class="font-semibold text-gray-800 dark:text-gray-200"></em> 
    </p>
    <CompletedTodos/>
  </div>
  <div id="tabs-with-underline-3" className={!hidden3 &&"hidden"} role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
    <p class="text-gray-500 dark:text-gray-400">
       <em class="font-semibold text-gray-800 dark:text-gray-200"></em> 
    </p>
    <UncompletedTodos/>
  </div>
</div></div>
        <div className="todo-wrapper">
          
        </div>
      </div>
    </todosContext.Provider>
  );
}

export default App;
