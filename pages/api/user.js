import db from "../../db"
import User from "../../db/models/user"
import { getSession } from "next-auth/react";


export default async function handler(req, res) {
  try {
    await db.connect();
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).json({ unauthorized: true })
    }

    if (req.method === "POST") {

      res.status(200).json({ name: "Merle Self " })
    }

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}
