import { db } from "../db";
import { DataTypes } from "sequelize";

export const ToDo = db.define(
  "todo",
  {
    todoname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.ENUM('Future', 'Needs Attention', 'In Progress', 'Done'),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('High', 'Moderate', 'Low')
    }
  }
);
