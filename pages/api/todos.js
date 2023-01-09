import { db } from "../../db";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";


export default async function handler(req, res) {
  const supabaseServerClient = createServerSupabaseClient({ req, res })
  const { method, body } = req;

  if (method === "GET") {
    const {
      data: { user }
    } = await supabaseServerClient.auth.getUser()

    try {
      const todos = await db.models.todo.findAll({ where: { userId: user.id } })
      res.status(200).send(todos);
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
