import { useEffect, useState, useCallback } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoListItemOverlay } from "./TodoListItemOverlay";
import { Modal } from "./Modal";
import { Loading } from "./Loading"
import { Error } from "./Error"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { useSession } from '@supabase/auth-helpers-react'

const MyToDos = () => {
  const session = useSession()
  const [todos, setToDos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  const [todoEditSuccessModalOpen, setTodoEditSuccessModalOpen] = useState(false)
  const [editTodoId, setEditTodoId] = useState("");

  const [todoCreationSuccessModalOpen, setTodoCreationSuccessModalOpen] = useState(false)
  const [todoDeletionSuccessModalOpen, setTodoDeletionSuccessModalOpen] = useState(false)

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

  // Todo CRUD START ********************
  const handleAddTodoSubmit = async (todoValues) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const body = {
        todoname: todoValues.todoname,
        due: todoValues.due,
        status: todoValues.status,
        priority: todoValues.priority,
        userId: session.user.id
      };
      await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      await getToDos()
      setIsLoading(false)
      setIsAddTodoModalOpen(false)
      setTodoCreationSuccessModalOpen(true)

    } catch (err) {
      console.log("[ADD TODO ERROR]: ", err);
      setIsError(true)
      setIsLoading(false)
    }
  }

  const handleEditTodo = (todoId) => () => {
    setEditTodoId(todoId);
    setIsEditTodoModalOpen(true);
  };

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
      setTodoEditSuccessModalOpen(true)
    } catch (err) {
      console.log("[EDIT TODO ERROR]: ", err);
      setIsError(true)
      setIsLoading(false)
    }
  };
  // Todo CRUD END ********************

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
      setTodoDeletionSuccessModalOpen(true)
    } catch (error) {
      console.log('[DELETE TODO ERROR]: ', error)
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

  const todoRowDefaultProps = {
    handleEditTodo,
    handleDelete
  }
  const todoRowProps = [
    {
      todos: future,
      status: 'Future',
      ...todoRowDefaultProps
    },
    {
      todos: needsAttention,
      status: 'Needs Attention',
      ...todoRowDefaultProps
    },
    {
      todos: inProgress,
      status: 'In Progress',
      ...todoRowDefaultProps
    },
    {
      todos: done,
      status: 'Done',
      ...todoRowDefaultProps
    }
  ]

  //  DNDContext START *********************
  const [activeId, setActiveId] = useState(null);
  const [activeTodo, setActiveTodo] = useState(null)

  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)
    setActiveTodo(active.data.current.todo);
  }
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.data.current.accepts.includes(active.data.current.type) && over.id != active.data.current.todo.status) {
      handleDroppedStatusChange(active.data.current.todo, over.id)
      setActiveId(null)
      setActiveTodo(null)
    }
  }

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

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
  )
  //  DNDContext END *********************

  if (isError) {
    return <Error />;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex flex-row-reverse h-28">
        <button
          className="w-1/6 m-5 btn btn-ghost modal-button"
          onClick={() => setIsAddTodoModalOpen(true)}
        >
          ADD TASK
        </button>
      </div>
      {isLoading ?
        <Loading />
        : null
      }
      <div className="flex flex-col flex-grow grid-cols-1 px-4 py-10 space-y-4 lg:space-y-0 lg:flex-row lg:grid-cols-4 lg:gap-4">
        {todoRowProps.map(({ status, todos }) => (
          <div className="w-full h-full col-span-1 shadow-lg card bg-base-300 rounded-box place-items-center lg:overflow-x-clip" key={status}>
            <TodoList
              todos={todos}
              handleEditTodo={handleEditTodo}
              handleDelete={handleDelete}
              status={status}
            />
          </div>
        ))}
        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <TodoListItemOverlay todo={activeTodo} />
          ) : null}
        </DragOverlay>
        <Modal isOpen={isAddTodoModalOpen}>
          <div className="flex items-center justify-between">
            <div className="text-2xl">Add Task:</div>
            <button className="btn btn-sm btn-ghost" onClick={() => setIsAddTodoModalOpen(false)}>
              x
            </button>
          </div>
          {isAddTodoModalOpen ? (
            <div className="w-full">
              <TodoForm handleSubmit={handleAddTodoSubmit} />
            </div>
          ) : null}
        </Modal>
        <Modal isOpen={isEditTodoModalOpen}>
          <div className="flex items-center justify-between">
            <div className="text-2xl">Edit Task:</div>
            <button className="btn btn-ghost" onClick={() => { setIsEditTodoModalOpen(false), setEditTodoId("") }}>
              x
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

        <Modal isOpen={todoCreationSuccessModalOpen}>
          <div className="flex items-center justify-between">
            <div className="text-2xl">Task Creation Successful!</div>
            <button className="btn btn-sm btn-ghost" onClick={() => setTodoCreationSuccessModalOpen(false)}>
              x
            </button>
          </div>
        </Modal>
        <Modal isOpen={todoEditSuccessModalOpen}>
          <div className="flex items-center justify-between">
            <div className="text-2xl">Task Edits Successful!</div>
            <button className="btn btn-sm btn-ghost" onClick={() => setTodoEditSuccessModalOpen(false)}>
              x
            </button>
          </div>
        </Modal>
        <Modal isOpen={todoDeletionSuccessModalOpen}>
          <div className="flex items-center justify-between">
            <div className="text-2xl">Task Deletion Successful!</div>
            <button className="btn btn-sm btn-ghost" onClick={() => setTodoDeletionSuccessModalOpen(false)}>
              x
            </button>
          </div>
        </Modal>
      </div>
    </DndContext >
  );
};

export default MyToDos;
