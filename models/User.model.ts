import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";
import Post from "./Post.model.ts";

export default class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    handle: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 10,
    },
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
  static posts() {
    return this.hasMany(Post);
  }
}
