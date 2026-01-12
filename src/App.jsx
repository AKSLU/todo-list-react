import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="app">
      <h1>Todo List</h1>

      <div className="input-block">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTodo}>add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="buttons">
                  <button onClick={() => toggleDone(todo.id)}>
                    {todo.done ? "back" : "ready"}
                  </button>
                  <button onClick={() => startEdit(todo)}>edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
