import { useAuth } from "../hooks/useAuth";
// import { useState, useEffect } from "react"
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

  // state for the various todo inputs 

  // state for loading : bool 


  //state for error: bool 

  // change handler for the input feilds 

  // onSubmit function that will post a toDo to the db 

  return (
    <div>
      <form>
        <label htmlFor='todoinput'>Todo: </label>
        <input type='text' id='todoinput' name='todoinput' />
        <br />
        <label>Due by: </label>
        <input type='date' id='dueby' name='dueby' />
        <br />
        <label>Status: </label>
        <select name='status' id='status-select'>
          <option value=''> --Task Status-- </option>
          <option value='Future' >Future</option>
          <option value='Needs Attention'>Needs Attention</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        <br />
        <label>Priority: </label>
        <select name='priority' id='priority-select'>
          <option value=''> --Task Priority-- </option>
          <option value='High' >High</option>
          <option value='Moderate'>Moderate</option>
          <option value='Low'>Low</option>
        </select>
        <br />
        <button type='submit' >Save Task</button>

      </form>
    </div>
  )
};

export default MyToDos;
