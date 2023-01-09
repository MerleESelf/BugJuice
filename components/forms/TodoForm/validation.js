import { date, object, string } from "yup";



export const TodoSchema = object({
  todoname: string().max(255).required("Please input a to-do!"),
  due: date().required(),
  status: string().required("Please choose status"),
  priority: string().required("Please choose priority")
})