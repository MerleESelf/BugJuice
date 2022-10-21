import { useState } from "react"

// gonna make a simple straight forward form at first to add to dos and to test 
// the post api route for todos once I get that working I'll use dnd kit to finalize the intened UI 
// going to also just have a simple display for the todos for now to just ge the core function of the get route working 

// want form to have error and loading state, state for the todos returned, and state for the various inputs to control the form
export const EditToDosForm = (props) => {
  const { todo, getToDos } = props
  const { id, todoname, due, priority, status } = todo

  // var that will hold context for the current date
  const todaysDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  // state for the various todo inputs 
  const [toDoInput, setToDoInput] = useState(todoname ? todoname : '')

  const [dueByInput, setDueByInput] = useState(due ? due : '')
  const [statusInput, setStatusInput] = useState(status ? status : '')
  const [priorityInput, setPriorityInput] = useState(priority ? priority : '')

  // state for loading : bool 
  const [isLoading, setIsLoading] = useState(false)

  //state for error: bool 
  const [isError, setIsError] = useState(false)

  // change handler for the input feilds 
  //todo input change 
  const handleToDoInputChange = (event) => {
    setToDoInput(event.target.value)
    event.preventDefault()
  }

  // dueby input change 
  const handleDueByInputChange = (event) => {
    setDueByInput(event.target.value)
    event.preventDefault()
  }

  // status input change 
  const handleStatusInputChange = (event) => {
    setStatusInput(event.target.value)
    event.preventDefault()
  }

  // priority input change 
  const handlePriorityInputChange = (event) => {
    setPriorityInput(event.target.value)
    event.preventDefault()
  }

  // DELETE
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
      console.log('Todo Delete Error', error)
      setIsError(true)
      setIsLoading(false)
    }
    setIsLoading(false)
    getToDos()
  }

  // EDIT
  const handleEdit = async (event) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const body = {
        id,
        todoname: toDoInput,
        due: dueByInput,
        status: statusInput,
        priorty: priorityInput
      };
      const response = await fetch("/api/todos", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log('Todo Put Error', error)
      setIsError(true)
      setIsLoading(false)

    }
    setIsLoading(false)
    getToDos()
    event.preventDefault()
  }

  return (
    <div>
      {isLoading ? <p> Saving Your ToDo's </p> : null}
      {isError ? <p> Something Went Wrong </p> : null}
      <form>
        <label htmlFor='todoinput'>Todo: </label>
        <input type='text' id='todoinput' name='todoinput' value={toDoInput} onChange={handleToDoInputChange} />
        <br />
        <label>Due by: </label>
        <input type='date' id='dueby' name='dueby' min={todaysDate} value={dueByInput} onChange={handleDueByInputChange} />
        < br />
        <label>Status: </label>
        <select name='status' id='status-select' value={statusInput} onChange={handleStatusInputChange}>
          <option value=''> --Task Status-- </option>
          <option value='Future' >Future</option>
          <option value='Needs Attention'>Needs Attention</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        <br />
        <label>Priority: </label>
        <select name='priority' id='priority-select' value={priorityInput} onChange={handlePriorityInputChange}>
          <option value=''> --Task Priority-- </option>
          <option value='High' >High</option>
          <option value='Moderate'>Moderate</option>
          <option value='Low'>Low</option>
        </select>
        <br />
      </form>
      <button onClick={handleEdit}>Edit Task</button>
      <button onClick={handleDelete}> Delete </button>
    </div >
  )
}