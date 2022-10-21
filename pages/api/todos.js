import { db } from "../../db";

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === "GET") {
    try {
      const allToDos = await db.models.todo.findAll()
      res.status(200).send(allToDos);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

  }

  if (method === "POST") {
    const { todo, due, status, priority, userId } = body;
    try {
      const data = {
        todoname: todo,
        due,
        status,
        priority,
        userId
      };
      const newToDo = await db.models.todo.create(data)
      res.status(200).send(newToDo);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  if (method === "PUT") {
    const { id } = body
    try {
      const todoToEdit = await db.models.todo.findByPk(id)

      await todoToEdit.update(body)
      await todoToEdit.reload()

      res.status(200).send(todoToEdit)
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

  }

  if (method === "DELETE") {
    // get id for task off the body and 
    const { id } = body
    try {
      const todoToDelete = await db.models.todo.findByPk(id)
      await todoToDelete.destroy()
      res.status(200).send(todoToDelete);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

  }
}
