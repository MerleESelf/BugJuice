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
    <div className="w-3/4 p-4 shadow-xl card bg-slate-800"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
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