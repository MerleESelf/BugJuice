import PropTypes from "prop-types";

export const ListItem = ({ todo, handleEditTodo, handleDelete }) => {
  return (
    <div className="w-3/4 p-4 shadow-xl card bg-slate-800">
      <div className="mb-2">{todo.todoname}</div>
      <div className="space-x-2">
        <button
          className="btn btn-xs btn-primary"
          onClick={handleEditTodo(todo.id)}
        >
          Edit
        </button>
        <button className="btn btn-xs btn-secondary" onClick={() => handleDelete(todo.id)}> Delete </button>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  todo: PropTypes.object,
  handleEditTodo: PropTypes.func,
};