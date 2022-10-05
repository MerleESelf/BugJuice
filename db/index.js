import { db } from "./db";
import { User } from "./models";

const syncDb = () => {
  db.sync({ force: true });
};

syncDb();

export { db, User };
