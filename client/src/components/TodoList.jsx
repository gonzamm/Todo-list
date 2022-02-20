import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import CategoryList from "./CategoryList";
import Spinner from "./Spinner";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("1");
  const [chargin, setChargin] = useState(false);

  const getTodos = async () => {
    const url = `http://localhost:8080/categorys/${category}`;
    const response = await fetch(url);
    const result = await response.json();
    const tasks = result.tasks;
    setTodos(tasks);
  };

  //Initial request to set data
  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    getTodos();
  }, [category]);

  const addTodo = async (todo) => {
    if (!todo.description) {
      return;
    }
    setChargin(true)
    
    const { description } = todo;
    const url = `http://localhost:8080/tasks/${category}`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ description: description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getTodos();
    setChargin(false)
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.description) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );

    const url = `http://localhost:8080/tasks/${todoId}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ description: newValue.description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getTodos();
  };

  const removeTodo = async (id) => {
    const confirmRemove = confirm('Sure?')
    if (!confirmRemove){
      return
    }

    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);

    const url = `http://localhost:8080/tasks/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const completeTodo = async (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.state = !todo.state;
      }
      return todo;
    });
    setTodos(updatedTodos);
    const url = `http://localhost:8080/tasks/state/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <CategoryList 
        category={category} 
        setCategory={setCategory} 
        setChargin={setChargin}
      />
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      {chargin ? <Spinner /> : ''}
    </>
  );
}

export default TodoList;
