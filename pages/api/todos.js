import { db } from "../../db";

export default async function handler(req, res) {
  console.log('here')
  const { method, body } = req;
  if (method === "POST") {
    console.log('body here', body)
    const { todo, due, status, priority } = body;
    try {
      const data = {
        todoname: todo,
        due,
        status,
        priority
      };
      console.log('data: ', data)
      const newToDo = await db.models.todo.create(data)
      res.status(200).send(newToDo);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}
