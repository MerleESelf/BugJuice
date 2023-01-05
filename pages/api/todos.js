import { db } from "../../db";
// import { useAuthUserContext } from "../../components/AuthUserContextProvider";
import { supabaseClient } from "../../lib/supabase";


export default async function handler(req, res) {
  const { method, body } = req;
  // const {user} = useAuthUserContext(); 
  const { user } = supabaseClient.auth.session()
  if (method === "GET") {

    try {
      const allToDos = await db.models.todo.findAll({ where: user.userId })
      res.status(200).send(allToDos);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

  }

  if (method === "POST") {
    const { todoname, due, status, priority, userId } = body;
    try {
      const data = {
        todoname,
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
