import { useAuth } from "../hooks/useAuth";
import { ToDosForm } from "./ToDosForm";
//needed for Dnd kit functionality
// import { Draggable } from './Draggable';
// import { Droppable } from './Droppable';


// we get onto this page
// useAuth didn't redirect use
// we want to query for data

// gonna make a simple straight forward form at first to add to dos and to test 
// the post api route for todos once I get that working I'll use dnd kit to finalize the intened UI 
// going to also just have a simple display for the todos for now to just ge the core function of the get route working 

// want form to have error and loading state, state for the todos returned, and state for the various inputs to control the form
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
