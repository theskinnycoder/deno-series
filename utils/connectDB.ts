import { DB_URI } from "./constants.ts";
import {
  Database,
  PostgresConnector,
  Relationships,
} from "https://deno.land/x/denodb/mod.ts";
import Post from "../models/Post.model.ts";
import User from "../models/User.model.ts";

const connectDB = async () => {
  try {
    const db = new Database(new PostgresConnector({ uri: DB_URI })).link([
      User,
      Post,
    ]);

    await db.sync({ drop: true });

    Relationships.belongsTo(Post, User);
    console.log(`Connected to the ${db.getDialect()} DataBase`);
    return db;
  } catch (error) {
    console.log(error);
    Deno.exit(1);
  }
};

export default connectDB;
