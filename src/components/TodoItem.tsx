import { DefaultTheme, makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { ITodo } from "../interfaces/todo.interface";

const useStyles = makeStyles<DefaultTheme>(() => ({
  root: {
    padding: ".5rem",
    border: "1px solid #02250F",
    color: "black",
    marginBottom: "0.2rem",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
  },
  todoInput: {
    color: "#0A66C2",
    backgroundColor: "transparent",
    border: "none",
    paddingLeft: "0.5rem",
    flex: 1,
  },
  todoActions: {
    "&>*": {
      color: "red",
      marginLeft: ".5rem",
    },
  },
  btn: {
    backgroundColor: "transparent",
    border: "1px solid #6A6A6A",
    borderRadius: "5px",
    color: "#5c9f98",
  },
  btnDelete: {
    color: "red",
  },
}));

type TodoItemProps = {
  todo: ITodo;
  updateTodo: (input: ITodo) => void;
};

const TodoItem = ({ todo, updateTodo }: TodoItemProps) => {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [todoCompleted, setTodoCompleted] = useState<boolean>(todo.isCompleted);
  const [todoText, setTodoText] = useState<string>(todo.text);

  const classes = useStyles();
  const { text, isCompleted, id } = todo;

  const toggleTodoInlineStyles = () => ({
    border: `1px solid ${isCompleted ? "#076023" : "#1A1A1A"}`,
    borderLeft: `5px solid ${isCompleted ? "#5C9F98" : "#6A6A6A"}`,
  });

  function handleEditClicked() {
    setCanEdit(!canEdit);
    const newTodo = {
      id,
      isCompleted: todoCompleted,
      text: todoText,
    };

    const isEditable =
      (text !== todoText || isCompleted !== todoCompleted) && canEdit;

    isEditable && updateTodo(newTodo);
  }

  function deleteTodo() {
    console.log("delete :", id);
  }

  return (
    <div className={classes.root} style={toggleTodoInlineStyles()}>
      <input
        className={classes.todoInput}
        type="text"
        defaultValue={text}
        disabled={!canEdit}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <div className={classes.todoActions}>
        <input
          type="checkbox"
          defaultChecked={todoCompleted}
          onChange={() => setTodoCompleted(!todoCompleted)}
          disabled={!canEdit}
        />
        <button className={classes.btn} onClick={handleEditClicked}>
          {canEdit ? "Save" : "Edit"}
        </button>
        <button
          className={`${classes.btn} ${classes.btnDelete}`}
          onClick={deleteTodo}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
