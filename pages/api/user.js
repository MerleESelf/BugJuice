import db from "../../db"
import User from "../../db/models/user"



export default async function handler(req, res) {
  try {
    await db.connect();


    // if () {
    //   return res.status(401).json({ unauthorized: true })
    // }

    if (req.method === "POST") {

      res.status(200).json({ name: "Merle Self " })
    }

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}
