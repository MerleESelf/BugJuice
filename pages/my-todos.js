import { useAuthUserContext } from "../components/AuthUserContextProvider";
import { useEffect, useState, useCallback } from "react";
import { TodoForm } from "../components/forms/TodoForm/";
import { List } from "../components/forms/TodoForm/List";
import { Modal } from "../components/Modal";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";


// state for all returned todos, loading state while the useEffect will run, error state
const MyToDos = () => {
  const { user } = useAuthUserContext();
  // use state for the returned todos from the use effect. Initialzied to null
  const [todos, setToDos] = useState([]);
  // state for loading : bool
  const [isLoading, setIsLoading] = useState(false);
  //state for error: bool
  const [isError, setIsError] = useState(false);

  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState("");

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

  // use effect to query for data upon page load to get all todos for a user
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
        priorty: todoValues.priorty,
        userId: user.id
      };

      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

    } catch (err) {
      console.log("[ADD TODO ERROR]: ", err);
      setIsError(true)
      setIsLoading(false)
    }
    //reset your states 
    setIsLoading(false)
    getToDos()
    setIsAddTodoModalOpen(false)
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
        priorty: todoValues.priorty
      };
      const response = await fetch("/api/todos", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

    } catch (err) {
      console.log("[EDIT TODO ERROR]: ", err);
      setIsError(true)
      setIsLoading(false)
    }
    setIsEditTodoModalOpen(false)
    setIsLoading(false)
    getToDos()
    e.preventDefault()
  };

  // handleDroppedStatusChange
  const handleDroppedStatusChange = async (todo, status) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const body = {
        id: todo.id,
        status
      };
      const response = await fetch("/api/todos", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })

    } catch (err) {
      console.log("[EDIT TODO ERROR]: ", err);
      setIsError(true)
      setIsLoading(false)
    }
    setIsLoading(false)
    getToDos()
  }

  // handleDelete func define here
  const handleDelete = async (id) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const body = {
        id: id
      };

      const response = await fetch("/api/todos", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log('Todo Delete Error', error)
      setIsError(true)
      setIsLoading(false)
    }
    setIsLoading(false)
    getToDos()
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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      handleDroppedStatusChange(active.data.current.todo, over.id)
    }
  }

  // loading states 
  if (isLoading) {
    return <p> {`Fetching Your ToDo's`} </p>;
  }
  if (isError) {
    return <p>Something Went Wrong </p>;
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex flex-row mt-12">

        <button
          className="m-5 btn btn-secondary modal-button"
          onClick={() => setIsAddTodoModalOpen(true)}
        >
          Add Todo
        </button>

        <div className="flex flex-row w-full px-8 space-x-4 flex-grow-1">
          <div className="grid flex-grow shadow-lg card bg-base-300 rounded-box place-items-center">
            <List
              todos={future}
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
              status="Future"
            />
          </div>
          <div className="grid flex-grow shadow-lg card bg-base-300 rounded-box place-items-center">
            <List
              todos={needsAttention}
              status="Needs Attention"
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
            />
          </div>
          <div className="grid flex-grow shadow-lg card bg-base-300 rounded-box place-items-center">
            <List
              todos={inProgress}
              status="In Progress"
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
            />
          </div>
          <div className="grid flex-grow shadow-lg card bg-base-300 rounded-box place-items-center">
            <List
              todos={done}
              status="Done"
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
            />
          </div>
        </div>
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
            <div className="text-2xl">Edit Todo: {editTodoId}</div>
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
              <div>Loading ...</div>
            )}
          </div>
        </Modal>
      </div>
    </DndContext>
  );
};

export default MyToDos;
