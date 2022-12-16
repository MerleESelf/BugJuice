import PropTypes from "prop-types";
export const ListItemOverlay = ({ todo }) => {
  return (
    <div className="flex flex-col items-center w-full indicator">
      <span className="mt-2 indicator-item indicator-center badge badge-outline">{todo.priority}</span>
      <div className="w-3/4 p-4 shadow-xl card bg-base-100"
      >
        <div className="my-2">
          <span>{todo.todoname} </span>
          <p>Complete by: {todo.due}</p>
        </div>
        <div className="space-x-2 grid-col-2 ">
          <button
            className="btn btn-xs btn-primary"
          >
            Edit
          </button>
          <button
            className="btn btn-xs btn-secondary"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

ListItemOverlay.propTypes = {
  todo: PropTypes.object,
};
