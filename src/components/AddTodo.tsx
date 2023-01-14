import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { ITodo } from "../interfaces/todo.interface";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(() => ({
  addTodoSection: {
    display: "flex",
    border: "1px solid transparent",
    backgroundColor: "transparent",
  },
  input: {
    backgroundColor: "transparent",
    outline: "none",
    border: "1px solid #6A6A6A",
    borderRight: "none",
    padding: "0.6em 0.6em",
    color: "#6A6A6A",
  },
  button: {
    padding: "0.6em 1.2em",
    fontSize: "1em",
    fontWeight: 500,
    color: "#5c9f98",
    backgroundColor: "transparent",
    cursor: "pointer",
    border: "1px solid #6A6A6A",
    "&:hover": {
      border: "1px solid #5c9f98",
    },
  },
  error: {
    color: "#EE3048",
    textAlign: "center",
  },
}));

type AddTodoProps = {
  addTodo: (input: ITodo) => void;
};

const AddTodo = ({ addTodo }: AddTodoProps) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();

  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text) {
      setError("Can't submit an empty todo");
      return;
    }
    const newTodo: ITodo = {
      id: uuidv4(),
      text,
      isCompleted: false,
    };
    addTodo(newTodo);
    setText("");
  }

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value);
    setError("");
  }

  return (
    <>
      <form onSubmit={handleAddTodo} className={classes.addTodoSection}>
        <input
          className={classes.input}
          name="todo"
          type="text"
          value={text}
          onChange={onTextChange}
          placeholder="Create a new todo"
        />
        <button type="submit" className={classes.button}>
          Add
        </button>
      </form>
      {error && <div className={classes.error}>{error}</div>}
    </>
  );
};

export default AddTodo;
