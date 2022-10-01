const { Sequelize } = require('sequelize');

const config = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  dialect: 'postgres',
}

console.log(config)
const db = new Sequelize(config);

module.exports = db
