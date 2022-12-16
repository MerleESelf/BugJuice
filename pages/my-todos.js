import { useAuthUserContext } from "../components/AuthUserContextProvider";
import { useEffect, useState, useCallback } from "react";
import { TodoForm } from "../components/forms/TodoForm/";
import { List } from "../components/forms/TodoForm/List";
import { ListItemOverlay } from "../components/ListItemOverlay";
import { Modal } from "../components/Modal";
import { Loading } from "../components/Loading"
import { Error } from "../components/Error"
import { DndContext, MouseSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";

const MyToDos = () => {
  const { user } = useAuthUserContext();
  const [todos, setToDos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [activeTodo, setActiveTodo] = useState(null)

  const getToDos = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch("/api/todos");
      const allToDos = await response.json();
      setToDos(allToDos);
      setIsLoading(false);
    } catch (error) {
      console.log("GET TODOS ERROR", error);
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getToDos();
  }, [getToDos]);

  const handleEditTodo = (todoId) => () => {
    setEditTodoId(todoId);
    setIsEditTodoModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditTodoId("");
    setIsEditTodoModalOpen(false);
  };

  const handleAddTodoSubmit = async (todoValues) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const body = {
        todoname: todoValues.todoname,
        due: todoValues.due,
        status: todoValues.status,
        priority: todoValues.priority,
        userId: user.id
      };
      await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      await getToDos()
      setIsLoading(false)
      setIsAddTodoModalOpen(false)

    } catch (err) {
      console.log("[ADD TODO ERROR]: ", err);
      setIsError(true)
      setIsLoading(false)
    }
  }

  const handleEditTodoSubmit = async (todoValues) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const body = {
        id: editTodoId,
        todoname: todoValues.todoname,
        due: todoValues.due,
        status: todoValues.status,
        priority: todoValues.priority
      };
      await fetch("/api/todos", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      await getToDos()
      setIsEditTodoModalOpen(false)
      setIsLoading(false)
    } catch (err) {
      console.log("[EDIT TODO ERROR]: ", err);
      setIsError(true)
      setIsLoading(false)
    }
  };

  const handleDroppedStatusChange = async (todo, status) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const body = {
        id: todo.id,
        status
      };
      await fetch("/api/todos", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
      await getToDos()
      setIsLoading(false)
    } catch (err) {
      console.log("[EDIT TODO ERROR]: ", err);
      setIsError(true)
      setIsLoading(false)
    }

  }

  const handleDelete = async (id) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const body = {
        id: id
      };
      await fetch("/api/todos", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      await getToDos()
      setIsLoading(false)
    } catch (error) {
      console.log('Todo Delete Error', error)
      setIsError(true)
      setIsLoading(false)
    }
  }

  const future = [];
  const needsAttention = [];
  const inProgress = [];
  const done = [];
  todos.forEach((todo) => {
    switch (todo.status) {
      case "Future":
        future.push(todo);
        break;
      case "Needs Attention":
        needsAttention.push(todo);
        break;
      case "In Progress":
        inProgress.push(todo);
        break;
      case "Done":
        done.push(todo);
        break;
      default:
        throw new Error("Invalid Todo Status");
    }
  });

  // *** DND context ***
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    }
  })
  const sensors = useSensors(
    mouseSensor
  )
  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)
    setActiveTodo(active.data.current.todo);
  }
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      handleDroppedStatusChange(active.data.current.todo, over.id)
      setActiveId(null)
      setActiveTodo(null)
    }
  }

  if (isError) {
    return <Error />;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex flex-col items-center">
        <button
          className="w-1/3 m-5 btn btn-ghost modal-button"
          onClick={() => setIsAddTodoModalOpen(true)}
        >
          ADD TO-DO
        </button>
      </div>
      <div className="h-4/5">
        {isLoading ?
          <Loading />
          : null
        }
        <div className="grid h-full grid-cols-4 gap-4">
          <div className="flex-grow col-span-1 my-4 shadow-lg card bg-base-300 rounded-box place-items-center">
            <List
              todos={future}
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
              status="Future"
            />
          </div>
          <div className="flex-grow col-span-1 my-4 shadow-lg card bg-base-300 rounded-box place-items-center">
            <List
              todos={needsAttention}
              status="Needs Attention"
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
            />
          </div>
          <div className="flex-grow col-span-1 my-4 shadow-lg card bg-base-300 rounded-box place-items-center">
            <List
              todos={inProgress}
              status="In Progress"
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
            />
          </div>
          <div className="flex-grow col-span-1 my-4 mr-4 shadow-lg card bg-base-300 rounded-box place-items-center">
            <List
              todos={done}
              status="Done"
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
            />
          </div>
          <DragOverlay>
            {activeId ? (
              <ListItemOverlay todo={activeTodo} />
            ) : null}
          </DragOverlay>
          <Modal isOpen={isAddTodoModalOpen}>
            <div className="flex items-center justify-between">
              <div className="text-2xl">Add Todo:</div>
              <button className="btn" onClick={() => setIsAddTodoModalOpen(false)}>
                X
              </button>
            </div>
            <div className="w-full">
              <TodoForm handleSubmit={handleAddTodoSubmit} />
            </div>
          </Modal>
          <Modal isOpen={isEditTodoModalOpen}>
            <div className="flex items-center justify-between">
              <div className="text-2xl">Edit to-do:</div>
              <button className="btn" onClick={handleCloseEditModal}>
                X
              </button>
            </div>
            <div className="w-full">
              {editTodoId ? (
                <TodoForm
                  handleSubmit={handleEditTodoSubmit}
                  editTodoValues={todos.find((todo) => {
                    return todo.id === editTodoId;
                  })}
                />
              ) : (
                <Loading />
              )}
            </div>
          </Modal>
        </div >
      </div>
    </DndContext >
  );
};

export default MyToDos;
