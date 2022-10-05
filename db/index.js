import { db } from "./db";
import { User } from "./models";

const syncDb = () => {
  db.sync();
};

syncDb();

export { db, User };
