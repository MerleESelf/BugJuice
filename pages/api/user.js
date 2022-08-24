import db from "../../db"


export default async function handler(req, res) {
  try {
    await db.connect();
    console.log('Connection has been established successfully.');
    res.status(200).json({ name: 'John Doe' })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}
