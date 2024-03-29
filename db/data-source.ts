import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { Posts } from "./entity/Posts";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "34.123.7.81",
  port: 3306,
  username: "root",
  password: "Qwerty12345",
  database: "homework-15",
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
