import { useState } from "react"

export const ToDosForm = () => {

  // var that will hold context for the current date
  const todaysDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  // state for the various todo inputs 
  const [toDoInput, setToDoInput] = useState('')
  const [dueByInput, setDueByInput] = useState('')
  const [statusInput, setStatusInput] = useState('')
  const [priorityInput, setPriorityInput] = useState('')

  // state for loading : bool 
  const [isLoading, setIsLoading] = useState(false)


  //state for error: bool 
  const [isError, setIsError] = useState(false)

  // change handler for the input feilds 

  //todo input change 
  const handleToDoInputChange = (event) => {
    setToDoInput(event.target.value)
    event.preventDefault
  }

  // dueby inout change 
  const handleDueByInputChange = (event) => {
    setDueByInput(event.target.value)
    event.preventDefault
  }

  // status input change 
  const handleStatusInputChange = (event) => {
    setStatusInput(event.target.value)
    event.preventDefault
  }

  // priority input change 
  const handlePriorityInputChange = (event) => {
    setPriorityInput(event.target.value)
    event.preventDefault
  }

  // onSubmit function that will post a toDo to the db 

  return (
    <form>
      <label htmlFor='todoinput'>Todo: </label>
      <input type='text' id='todoinput' name='todoinput' value={toDoInput} />
      <br />
      <label>Due by: </label>
      <input type='date' id='dueby' name='dueby' min={todaysDate} value={dueByInput} />
      < br />
      <label>Status: </label>
      <select name='status' id='status-select' value={statusInput}>
        <option value=''> --Task Status-- </option>
        <option value='Future' >Future</option>
        <option value='Needs Attention'>Needs Attention</option>
        <option value='In Progress'>In Progress</option>
        <option value='Done'>Done</option>
      </select>
      <br />
      <label>Priority: </label>
      <select name='priority' id='priority-select' value={priorityInput}>
        <option value=''> --Task Priority-- </option>
        <option value='High' >High</option>
        <option value='Moderate'>Moderate</option>
        <option value='Low'>Low</option>
      </select>
      <br />
      <button type='submit' >Save Task</button>
    </form>
  )
}