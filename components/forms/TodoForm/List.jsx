import PropTypes from "prop-types";
import { ListItem } from "./ListItem";
import { useDroppable } from "@dnd-kit/core";

export const List = ({ todos, status, handleEditTodo, handleDelete }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `${status}`,
    data: {
      accepts: ['todo']
    }
  })
  const style = {
    transform: isOver ? "scale(1.1)" : undefined,
  };
  const total = todos.length
  return (
    <div className="flex flex-col items-center text-center w-full h-full max-h-[650px] pb-6 space-y-6 overflow-x-hidden overscroll-y-auto card" ref={setNodeRef}>

      <div className="sticky top-0 z-10 w-full mt-3 text-2xl bg-base-300 " style={style}>
        <span >{status} {total ? <span className="mt-2 badge badge-lg badge-outline ">{total}</span> : null} </span>
      </div>
      {
        todos.map((todo) => (
          <ListItem key={todo.id} todo={todo} handleEditTodo={handleEditTodo} handleDelete={handleDelete} />
        ))
      }
    </div >

  );
};

List.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  handleEditTodo: PropTypes.func,
};