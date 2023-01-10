import PropTypes from "prop-types";
import { TodoListItem } from "./TodoListItem";
import { useDroppable } from "@dnd-kit/core";
import { useWindowSize } from "../hooks/useWindowSize";

export const TodoListMobile = ({ todos, status, handleEditTodo, handleDelete }) => {
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
    <div className="flex flex-col w-full h-full px-10 pb-6 space-y-6 text-center card" ref={setNodeRef}>
      <div className="top-0 z-10 w-full mt-3 text-2xl bg-base-300" style={style}>
        <span >{status} {total ? <span className="mt-2 badge badge-lg badge-outline ">{total}</span> : null} </span>
      </div>
      <div className="flex flex-row justify-start space-x-2 overflow-x-scroll overflow-y-clip">
        {
          todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} handleEditTodo={handleEditTodo} handleDelete={handleDelete} />
          ))
        }
      </div>
    </div >
  );
};

export const TodoListDesktop = ({ todos, status, handleEditTodo, handleDelete }) => {
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
    <div className="flex flex-col items-center w-full pb-6 space-y-6 text-center card max-h-[700px] overflow-x-clip" ref={setNodeRef}>
      <div className="sticky top-0 z-10 w-full mt-3 text-2xl bg-base-300 " style={style}>
        <span >{status} {total ? <span className="mt-2 badge badge-lg badge-outline ">{total}</span> : null} </span>
      </div>
      <div className="overflow-y-scroll overflow-x-clip">
        {
          todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} handleEditTodo={handleEditTodo} handleDelete={handleDelete} />
          ))
        }
      </div>
    </div >
  );
};

export const TodoList = (props) => {
  const [width] = useWindowSize()
  return (
    <>
      {width > 1024 ? <TodoListDesktop {...props} /> : <TodoListMobile {...props} />}
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  handleEditTodo: PropTypes.func,
};