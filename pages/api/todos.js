import { db } from "../../db";

export default async function handler(req, res) {

  const { method, body } = req;
  if (method === "POST") {
    const { todo, due, status, priority } = body;
    try {
      const data = {
        todoname: todo,
        due,
        status,
        priority
      };
      const newToDo = await db.models.todo.create(data)
      res.status(200).send(newToDo);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
  if (method === "GET") {
    try {
      const allToDos = await db.models.todo.findAll()
      res.status(200).send(allToDos);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

  }
  // if (method === "PUT") {
  //   try {

  //   } catch (error) {
  //     console.error("Unable to connect to the database:", error);
  //   }

  // }
  // if (method === "DELETE") {
  //   try {

  //   } catch (error) {
  //     console.error("Unable to connect to the database:", error);
  //   }

  // }
}
