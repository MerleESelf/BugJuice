import { useAuth } from "../hooks/useAuth";
import { useAuthUserContext } from "../components/AuthUserContextProvider";
import { useEffect, useState, useCallback } from "react"
import { EditToDosForm } from "../components/EditToDosForm";
import { NewToDoForm } from "../components/NewToDoForm";

// state for all returned todos, loading state while the useEffect will run, error state 
const MyToDos = () => {
  useAuth()
  const { user } = useAuthUserContext();
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
      Make A New Task
      <NewToDoForm getToDos={getToDos} user={user} />
      <br />
      Your Tasks
      {todos.map((todo) => {
        console.log("in my todos", todo)
        return (<EditToDosForm todo={todo} key={todo.id} getToDos={getToDos} user={user} />)
      })}
    </div>
  )
};

export default MyToDos;
