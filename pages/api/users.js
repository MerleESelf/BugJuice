import { db } from "../../db";

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    const { user } = body;
    const { email, id: githubId, user_metadata } = user;

    try {
      const userData = {
        githubId,
        avatar: user_metadata?.avatar_url || null,
        name: user_metadata?.full_name || null,
        email,
      };
      const user = await db.models.user.findOrCreate({
        where: userData,
      });
      console.log("USER: ", user);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}
