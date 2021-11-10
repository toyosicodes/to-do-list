import { useState, useEffect } from "react";
import "./App.css";
import "./styles/styles.scss";
import Form from "./components/Form";

import TodoList from "./components/TodoList";
import User from "./components/User";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [user, setUser] = useState();
  const [userState, setUserState] = useState([]);

  useEffect(() => {
    getLocalTodos();
    getUserName();
  }, []);

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filterHandler();
    const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };
    saveLocalTodos();
  }, [todos, status]);
  useEffect(() => {
    const saveUserName = () => {
      localStorage.setItem("userState", JSON.stringify(userState));
    };
    saveUserName();
  }, [userState]);

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));

      setTodos(todoLocal);
    }
  };

  const getUserName = () => {
    if (localStorage.getItem("userState") === null) {
      localStorage.setItem("userState", JSON.stringify([]));
    } else {
      let userStateLocal = JSON.parse(localStorage.getItem("userState"));

      setUserState(userStateLocal);
    }
  };
  const setNameHandler = async (e) => {
    await setUser(e.target.value);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await setUserState([user]);
    setUser("");
  };

  return (
    <div className="App">
      <header>
        <h1>Toyosi's To-Do App</h1>
      </header>
      <div id="repeat">
        <h3>
          Repeat after me: I will be the most organised and productive version
          of myself today!
        </h3>
        <span></span>
      </div>
      <form id="first-form" onSubmit={formSubmitHandler}>
        <h4 className="name-text">
          Enter your name to personalise this to-do app:
        </h4>
        <input
          id="name-box"
          value={user}
          onChange={setNameHandler}
          type="text"
        />
        <button id="name-button" type="submit">
          set name!
        </button>
      </form>

      <div>
        {userState.map((userName) => (
          <User key={Math.random() * 10000} userName={userName} />
        ))}
      </div>
      <Form
        setStatus={setStatus}
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
      />

      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
