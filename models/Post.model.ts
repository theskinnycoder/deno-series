import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";
import User from "./User.model.ts";

export default class Post extends Model {
  static table = "posts";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 10,
    },
    content: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      length: 100,
    },
  };
  static author() {
    return this.hasOne(User);
  }
}
