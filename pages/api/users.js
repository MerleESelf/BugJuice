import db from "../../db";

export default async function handler(req, res) {
  try {
    console.log("IN API USERS");
    await db.connect();

    // if (req.method === "POST") {
    //   res.status(200).json({ name: "Merle Self " });
    // }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
