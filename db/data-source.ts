import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { Posts } from "./entity/Posts";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  database: "homework-15",
  host: "34.123.7.81",
  password: "Qwerty12345",
  // database: "homework-13",
  // host: "127.0.0.1",
  // password: "12345678",
  port: 3306,
  username: "root",
  // connectTimeout: 20000,
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
