import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

import { Todo } from "./types";

function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = () => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (id: string) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h1>Todo List</h1>
      <Create onAddSuccess={fetchTodos} />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Home;
