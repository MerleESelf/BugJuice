import { User } from "./user";
import { ToDo } from "./todo";

User.hasMany(ToDo);
ToDo.belongsTo(User);

export { User, ToDo };
