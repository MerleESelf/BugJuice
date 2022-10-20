export const ToDoCard = (props) => {
  const { todo } = props

  // will list out all the attributes of the to do and have a button for edit and delete
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