import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { Posts } from "./entity/Posts";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  port: 3306,
  username: "admin",
  database: "my_database",
  host: "database-1.c5a26a8qu2hb.us-east-2.rds.amazonaws.com",
  password: "Qwerty12345",
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
