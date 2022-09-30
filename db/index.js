const { Sequelize } = require('sequelize');

const db = new Sequelize({
  host: 'localhost',
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  dialect: 'postgres',
});

module.exports = db
