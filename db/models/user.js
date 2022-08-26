const db = require("../")
const { DataTypes } = require('sequelize')


const User = db.define("User", {
  userID: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
  }, 
  name: {
    type: DataTypes.STRING, 
    allowNull: false, 
  }, 
  email: {
    type: DataTypes.STRING, 
    allowNull: false, 
  }
})