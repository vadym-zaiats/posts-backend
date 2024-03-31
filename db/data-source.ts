import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { Posts } from "./entity/Posts";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  port: 3306,
  username: "root",
  database: process.env.DB_DATABASE || "homework-13",
  host: process.env.DB_HOST || "127.0.0.1",
  password: process.env.DB_PASSWORD || "12345678",
  synchronize: true,
  logging: false,
  entities: [Users, Posts],
  migrations: [
    process.env.NODE_ENV !== "production"
      ? "db/migration/**/*.ts"
      : "migration/**/*.js",
  ],
  subscribers: [],
});
