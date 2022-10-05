import { Sequelize } from "sequelize";

const config = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  username: process.env.DB_USER,
  dialect: "postgres",
  port: process.env.PORT,
};

const prod_config = {
  host: process.env.PROD_HOST,
  database: process.env.PROD_DB,
  username: process.env.PROD_USER,
  password: process.env.PROD_PASSWORD,
  dialect: "postgres",
  port: process.env.PROD_PORT,
};

const db = new Sequelize(prod_config);
export { db };
