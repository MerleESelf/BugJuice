import { date, object, string } from "yup";

export const TodoSchema = object({
  todoname: string().required(),
  due: date().required(),
});