import PropTypes from "prop-types";
import { ListItem } from "./ListItem";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useLayoutEffect, useState } from "react";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


export const ListMobile = ({ todos, status, handleEditTodo, handleDelete }) => {
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
      <div className="flex flex-row w-full space-x-2 overflow-x-scroll">
        {
          todos.map((todo) => (
            <ListItem key={todo.id} todo={todo} handleEditTodo={handleEditTodo} handleDelete={handleDelete} />
          ))
        }
      </div>
    </div >

  );
};

export const ListDeskop = ({ todos, status, handleEditTodo, handleDelete, height }) => {
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
            <ListItem key={todo.id} todo={todo} handleEditTodo={handleEditTodo} handleDelete={handleDelete} />
          ))
        }
      </div>
    </div >

  );
};

export const List = (props) => {
  const [width, height] = useWindowSize()

  return (
    <>
      {width > 1024 ? <ListDeskop {...props} height={height} /> : <ListMobile {...props} />}
    </>
  );
};

List.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  handleEditTodo: PropTypes.func,
};