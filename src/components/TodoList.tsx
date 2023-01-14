import { makeStyles } from "@material-ui/styles";
import { ITodo } from "../interfaces/todo.interface";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: ITodo[];
  updateTodo: (input: ITodo) => void;
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
}));

const TodoList = ({ todos = [], updateTodo }: TodoListProps) => {
  const classes = useStyles();
  const todosAvailable = todos.length > 0;

  if (!todosAvailable) {
    return <>No todos found</>;
  }

  return (
    <div className={classes.root}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} updateTodo={updateTodo} />
      ))}
    </div>
  );
};

export default TodoList;
