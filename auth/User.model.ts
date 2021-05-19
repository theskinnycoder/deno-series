import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";
import Post from "../blog/Post.model.ts";

export default class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  id!: number;
  email!: string;
  password!: string;

  static posts() {
    return this.hasMany(Post);
  }
}
