import { useAuth } from "../hooks/useAuth";
import { ToDosForm } from "./ToDosForm";
//needed for Dnd kit functionality
// import { Draggable } from './Draggable';
// import { Droppable } from './Droppable';


// we get onto this page
// useAuth didn't redirect use
// we want to query for data

const MyToDos = () => {
  useAuth();
  // use effect to query for data upon page load to get all todos for a user 

  // will need state to hold our returned todos 

  return (
    <div>
      <ToDosForm />
    </div>
  )
};

export default MyToDos;
