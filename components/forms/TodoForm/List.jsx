import PropTypes from "prop-types";
import { ListItem } from "./ListItem";

export const List = ({ todos, status, handleEditTodo, handleDelete }) => {
  return (
    <div className="flex flex-col items-center pb-6 space-y-6 shadow-xl card bg-slate-200">
      <div className="text-3xl">Status: {status}</div>
      {todos.map((todo) => (
        <ListItem key={todo.id} todo={todo} handleEditTodo={handleEditTodo} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

List.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  handleEditTodo: PropTypes.func,
};