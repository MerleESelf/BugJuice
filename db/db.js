import { Sequelize } from "sequelize";
import * as pg from 'pg';

// const config = {
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   username: process.env.DB_USER,
//   dialect: "postgres",
//   port: process.env.PORT,
//   logging: false,
// };

// const prod_config = {
//   host: process.env.PROD_HOST,
//   database: process.env.PROD_DB,
//   username: process.env.PROD_USER,
//   password: process.env.PROD_PASSWORD,
//   dialect: "postgres",
//   dialectModule: pg,
//   port: process.env.PROD_PORT,
//   logging: false,
// };

const db = new Sequelize(
  process.env.PROD_DB,
  process.env.PROD_USER,
  process.env.PROD_PASSWORD,
  {
    host: process.env.PROD_HOST,
    port: process.env.PROD_PORT,
    dialect: "postgres",
    dialectModule: pg
  }
);

export { db };
