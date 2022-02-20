import React from "react";
import { useState, useEffect } from "react";

const CategoryList = ({ category, setCategory, setChargin }) => {
  const [options, setOptions] = useState([]);
  const [isForm, setIsForm] = useState(true);
  const [input, setInput] = useState("");

  const getCategoryOptions = async () => {
    const url = `http://localhost:8080/categorys`;
    const response = await fetch(url);
    const result = await response.json();
    setOptions(result);
  };

  useEffect(() => {
    getCategoryOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChargin(true)

    if (!input) {
      alert("Invalid Category");
      setIsForm(true);
      return;
    }

    const url = `http://localhost:8080/categorys`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ tittle: input }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getCategoryOptions();
    setInput("");
    setIsForm(true);
    setChargin(false)
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmRemove = confirm('Sure?')
    if (!confirmRemove){
      return
    }

    setChargin(true)

    const url = `http://localhost:8080/categorys/${category}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getCategoryOptions();
    setCategory("1");
    setChargin(false)
  };

  return (
    <div>
      {isForm ? (
        <>
          <select
            name="category"
            className="category-select"
            defaultValue={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.tittle}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setIsForm(false);
            }}
            className="todo-button edit"
          >
            New
          </button>
          <button onClick={handleDelete} className="todo-button delete">
            Delete
          </button>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Create new Category"
              value={input}
              onChange={handleChange}
              name="category"
              className="todo-input edit"
            />
            <button onClick={handleSubmit} className="todo-button edit">
              Add Category
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CategoryList;
