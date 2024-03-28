/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Strategy } from "passport-http-bearer";
import { LoginError } from "../services/errorHandler";
import { type DecodedToken } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";
import { Users } from "../db/entity/User";
import { AppDataSource } from "../db/data-source";

const userRepository = AppDataSource.getRepository(Users);

const authMiddleware = async (
  token: string,
  done: (err: Error | null, user?: any) => void
) => {
  console.log("СПРАЦЮВАВ PASSPORT.JS");

  const decodedData: DecodedToken = await new Promise((resolve, reject) => {
    jwt.verify(token, "secret", async (err, decoded: any) => {
      if (err) {
        reject(null);
      } else {
        resolve(decoded);
      }
    });
  });
  const { email, password } = decodedData;
  const isUserExist = await userRepository.findOneBy({
    email,
  });

  if (!isUserExist) {
    console.log("authMiddleware NO USER");
    // throw new LoginError("Користувач не авторизований"); // ????? ------------
    done(null, null);
    return;
  }

  if (decodedData.password !== password) {
    console.log("authMiddleware WRONG PASSWORD");
    //      throw new LoginError("Користувач не авторизований"); // ????? ------------
    done(null, null);
    return;
  }

  console.log("authMiddleware SUCCESS", decodedData);
  done(null, decodedData);
};

export const bearerStrategy = new Strategy(authMiddleware);
