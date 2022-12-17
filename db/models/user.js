import { db } from "../db";
import { DataTypes } from "sequelize";

export const User = db.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);
