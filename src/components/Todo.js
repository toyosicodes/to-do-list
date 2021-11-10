const Todo = ({ todo, todos, setTodos, filteredTodos }) => {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };
  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };
  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {todo.text}
      </li>
      <button
        onClick={completeHandler}
        className={`complete-btn ${todo.completed ? "completedTask" : ""}`}
      >
        <i className="fas fa-check" />
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash" />
      </button>
    </div>
  );
};

export default Todo;
