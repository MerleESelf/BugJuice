import PropTypes from "prop-types";
import { truncateText } from "../lib/stringHelpers";

export const TodoListItemOverlay = ({ todo }) => {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="indicator">
        <span className="indicator-item indicator-center badge badge-outline">{todo.priority}</span>
        <div className="justify-between w-64 p-4 shadow-xl h-36 card bg-base-100">
          <div className="flex flex-col">
            <span className="break-all">{truncateText(todo.todoname)} </span>
            <p>Complete by: {todo.due}</p>
          </div>
          <div className="flex justify-center w-full flex-row-wrap">
            <button className="mx-1 btn btn-xs btn-primary">
              Edit
            </button>
            <button className="mx-1 btn btn-xs btn-secondary">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TodoListItemOverlay.propTypes = {
  todo: PropTypes.object,
};
