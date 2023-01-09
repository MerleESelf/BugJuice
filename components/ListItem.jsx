import PropTypes from "prop-types";
import { useDraggable } from "@dnd-kit/core";


export const ListItem = ({ todo, handleEditTodo, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${todo.id}`,
    data: {
      type: 'todo',
      todo
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    visibility: "hidden"

  } : undefined;


  return (
    <div className="flex flex-col items-center w-full py-4"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
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
              onClick={handleEditTodo(todo.id)}
            >
              Edit
            </button>
            <button
              className="mx-1 btn btn-xs btn-secondary "
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
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
