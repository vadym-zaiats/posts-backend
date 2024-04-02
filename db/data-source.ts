import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { Posts } from "./entity/Posts";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "hdkwhldt",
  database: "hdkwhldt",
  host: "horton.db.elephantsql.com",
  password: "Y3L3pkZqB02mQUap8iNDBytFpJlrFf_F",
  // username: process.env.DB_USERNAME,
  // database: process.env.DB_DATABASE,
  // host: process.env.DB_HOST,
  // password: process.env.DB_PASSWORD,
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
