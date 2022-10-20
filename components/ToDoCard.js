export const ToDoCard = (props) => {

  const { todo } = props

  // on Click for delete 

  // on click for edit 
  return (
    <div>
      <p>Task:{todo.todoname}</p>
      <p>Status: {todo.status}</p>
      <p>Priority: {todo.priority}</p>
      <p>Due By: {todo.due} </p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}