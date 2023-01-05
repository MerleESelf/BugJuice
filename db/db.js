import { Sequelize } from "sequelize";
import * as pg from 'pg'

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
