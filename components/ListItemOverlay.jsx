import PropTypes from "prop-types";
export const ListItemOverlay = ({ todo }) => {
  return (
    <div className="flex flex-col items-center py-4 text-center lg:w-full">
      <div className="indicator">
        <span className="indicator-item indicator-center badge badge-outline">{todo.priority}</span>
        <div className="w-64 p-4 shadow-xl lg:w-full card bg-base-100">
          <div className="my-2">
            <span>{todo.todoname} </span>
            <p>Complete by: {todo.due}</p>
          </div>
          <div className="flex justify-start flex-row-wrap">
            <button
              className="mx-1 btn btn-xs btn-primary"
            >
              Edit
            </button>
            <button
              className="mx-1 btn btn-xs btn-secondary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ListItemOverlay.propTypes = {
  todo: PropTypes.object,
};
