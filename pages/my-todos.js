import { useAuth } from "../hooks/useAuth";
import { ToDosForm } from "./ToDosForm";
import { useEffect, useState, useCallback } from "react"
import { ToDoCard } from "../components/ToDoCard";



// we get onto this page
// useAuth didn't redirect use
// we want to query for data

// state for all returned todos, loading state while the useEffect will run, error state 
const MyToDos = () => {
  useAuth();
  // use state for the returned todos from the use effect. Initialzied to null 56
  const [todos, setToDos] = useState([])

  // state for loading : bool 
  const [isLoading, setIsLoading] = useState(false)

  //state for error: bool 
  const [isError, setIsError] = useState(false)

  const getToDos = useCallback(async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await fetch("/api/todos");
      const allToDos = await response.json()
      setToDos(allToDos)
      setIsLoading(false)
    } catch (error) {
      console.log('todos get error', error)
      setIsError(true)
      setIsLoading(false)
    }
  }, [])

  // use effect to query for data upon page load to get all todos for a user 
  useEffect(() => {
    getToDos();
  }, [getToDos])



  return (
    <div>
      {isLoading ? <p> Fetching Your ToDo's </p> : null}
      {isError ? <p> Something Went Wrong </p> : null}
      <ToDosForm getToDos={getToDos} />
      {todos.map((todo) => {
        return (<ToDoCard todo={todo} key={todo.id} getToDos={getToDos} />)
      })}
    </div>
  )
};

export default MyToDos;
