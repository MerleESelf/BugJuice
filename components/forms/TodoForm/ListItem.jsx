import PropTypes from "prop-types";
import { useDraggable } from "@dnd-kit/core";

export const ListItem = ({ todo, handleEditTodo, handleDelete }) => {
  //from dnd quick start 
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${todo.id}`,
    data: {
      type: 'todo',
      todo
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div className="flex flex-col items-center w-full indicator"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <span className="mt-2 indicator-item indicator-center badge badge-outline">{todo.priority}</span>
      <div className="w-3/4 p-4 shadow-xl card bg-base-100">
        <div className="my-2">
          <span>{todo.todoname} </span>
          <p>Complete by: {todo.due}</p>
        </div>
        <div className="space-x-2 grid-col-2 ">
          <button
            className="btn btn-xs btn-primary"
            onClick={handleEditTodo(todo.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-xs btn-secondary "
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  todo: PropTypes.object,
  handleEditTodo: PropTypes.func,
  handleDelete: PropTypes.func
};