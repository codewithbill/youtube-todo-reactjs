import { useState } from "react";
import TodoList from "./components/TodoList";
import { makeStyles } from "@material-ui/styles";
import AddTodo from "./components/AddTodo";
import { ITodo } from "./interfaces/todo.interface";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "80%",
    margin: "auto",
    backgroundColor: "#333133",
    padding: "2rem",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    color: "#5c9f98",
    textTransform: "uppercase",
  },
}));

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleAddTodo = (newTodo: ITodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  function updateTodo(input: ITodo) {
    const { id } = input;
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...input } : todo
    );
    setTodos(newTodos);
  }

  return (
    <>
      <div className={classes.root}>
        <h1 className={classes.header}>React todo app</h1>
        <AddTodo addTodo={handleAddTodo} />
        <TodoList todos={todos} updateTodo={updateTodo} />
      </div>
    </>
  );
}

export default App;
