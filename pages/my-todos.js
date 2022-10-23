import { useAuth } from "../hooks/useAuth";
import { useAuthUserContext } from "../components/AuthUserContextProvider";
import { useEffect, useState, useCallback } from "react"
import { EditToDosForm } from "../components/EditToDosForm";
import { NewToDoForm } from "../components/NewToDoForm";

// state for all returned todos, loading state while the useEffect will run, error state 
const MyToDos = () => {
  useAuth()
  const { user } = useAuthUserContext();
  // use state for the returned todos from the use effect. Initialzied to null 
  const [todos, setToDos] = useState([])


  // filtered future tasks 
  const future = todos.filter((todo) => {
    return todo.status === 'Future'
  })
  const needsAttention = todos.filter((todo) => {
    return todo.status === 'Needs Attention'
  })
  // filtered in progress tasks 
  const inProgress = todos.filter((todo) => {
    return todo.status === 'In Progress'
  })
  // filtered tasks marked done                      
  const done = todos.filter((todo) => {
    return todo.status === 'Done'
  })


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
    <div id="mytodosdiv" >

      {isLoading ? <p> Fetching Your ToDo's </p> : null}
      {isError ? <p> Something Went Wrong </p> : null}

      <div>
        <h1>{user.name}'s To-do List:</h1>
        <div className="newtodoformdiv">
          <h2>Add a new to-do: </h2>
          <NewToDoForm
            getToDos={getToDos}
            user={user}
            className="todoForm" />
        </div>
      </div>

      <div id="edittodosdiv">
        <div className="edittodoformdiv">
          <h3>Future: </h3>
          {future.map((todo) => {
            return (<EditToDosForm
              todo={todo}
              key={todo.id}
              getToDos={getToDos}
              user={user}
              className="todoForm" />)
          })}
        </div>
        <div className="edittodoformdiv">
          <h3>Needs Attention: </h3>
          {needsAttention.map((todo) => {
            return (<EditToDosForm
              todo={todo}
              key={todo.id}
              getToDos={getToDos}
              user={user}
              className="todoForm" />)
          })}
        </div>
        <div className="edittodoformdiv">
          <h3>In Progress: </h3>
          {inProgress.map((todo) => {
            return (<EditToDosForm
              todo={todo}
              key={todo.id}
              getToDos={getToDos}
              user={user}
              className="todoForm" />)
          })}
        </div>
        <div className="edittodoformdiv">
          <h3>Done: </h3>
          {done.map((todo) => {
            return (<EditToDosForm
              todo={todo}
              key={todo.id}
              getToDos={getToDos}
              user={user} c
              lassName="todoForm" />)
          })}
        </div>
      </div>
    </div>
  )
};

export default MyToDos;
