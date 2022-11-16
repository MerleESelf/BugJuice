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
    color: isOver ? '#c084fc' : undefined,
  };
  return (
    <div className="static flex flex-col items-center pb-6 space-y-6 card" ref={setNodeRef} style={style}>
      <div className="text-3xl ">{status}</div>
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