import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { Posts } from "./entity/Posts";
import * as dotenv from "dotenv";
dotenv.config();

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   port: 5432,
//   username: process.env.DB_USERNAME,
//   database: process.env.DB_DATABASE,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   synchronize: true,
//   logging: false,
//   entities: [Users, Posts],
//   migrations: [
//     process.env.NODE_ENV !== "production"
//       ? "db/migration/**/*.ts"
//       : "migration/**/*.js",
//   ],
//   subscribers: [],
// });

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "12345678",
  database: "homework-13",
  synchronize: true,
  logging: false,
  entities: [Users, Posts],
  migrations: ["db/migration/**/*.ts"],
  subscribers: [],
});
