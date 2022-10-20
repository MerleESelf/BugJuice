import { useState } from "react"

export const ToDoCard = (props) => {
  const { todo, getToDos } = props

  const { id, todoname, due, priority, status } = todo
  // state for loading : bool 
  const [isLoading, setIsLoading] = useState(false)

  //state for error: bool 
  const [isError, setIsError] = useState(false)

  // on Click for delete 
  const handleDelete = async (event) => {
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
      console.log('Todo Post Error', error)
      setIsError(true)
      setIsLoading(false)
    }
    setIsLoading(false)
    getToDos()
  }

  // on click for edit 
  // const handleEdit = async (event) => {
  //   try {
  //     const body = {
  //       id: id,
  //       todo: todoname,
  //       due: due,
  //       status: status,
  //       priority: priority
  //     };

  //     const response = await fetch("/api/todos", {
  //       method: "PUT",
  //       body: JSON.stringify(body),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   } catch (error) {
  //     console.log('Todo Post Error', error)
  //     setIsError(true)
  //     setIsLoading(false)
  //   }
  // }
  return (
    <div>
      <p>Task: {todoname}</p>
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>
      <p>Due By: {due} </p>
      <button>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}