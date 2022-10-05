import { Sequelize } from "sequelize";

const config = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  dialect: "postgres",
};

const db = new Sequelize(config);

export { db };