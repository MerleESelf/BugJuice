import { useAuth } from "../hooks/useAuth";
import { ToDosForm } from "./ToDosForm";
import { useEffect, useState } from "react"
import { requestToBodyStream } from "next/dist/server/body-streams";


// we get onto this page
// useAuth didn't redirect use
// we want to query for data

// state for all returned todos, loading state while the useEffect will run, error state 
const MyToDos = () => {
  useAuth();
  // use state for the returned todos from the use effect. Initialzied to null 
  const [todos, setToDos] = useState(null)

  // use effect to query for data upon page load to get all todos for a user 
  useEffect(() => {
    async function getToDos() {
      try {
        const response = await fetch("/api/todos");
        const allToDos = await response.json()
        setToDos(allToDos)
      } catch (error) {
        console.log(error)
      }
    }
    getToDos();
  }, [])

  console.log('toDos HEREEEEEE!!!!!!', todos)

  // will need state to hold our returned todos 

  return (
    <div>
      <ToDosForm />
    </div>
  )
};

export default MyToDos;
