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
  return (
    <div className="flex flex-col items-center w-full h-full pb-6 space-y-6 overflow-auto card" ref={setNodeRef}>
      <div className="sticky top-0 z-10 w-full mt-3 text-2xl text-center bg-base-300" style={style}>{status}</div>
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