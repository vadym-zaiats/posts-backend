import { type Request, type Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Users } from "../db/entity/User";
import jwt from "jsonwebtoken";
import { checkUserService, hashPassword } from "../validation/users";
import {
  LoginError,
  ExistingUserError,
  ValidationError,
} from "../services/errorHandler";

const userRepository = AppDataSource.getRepository(Users);

class UserController {
  async signUp(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const check: any = checkUserService(req.body);

    if (check?.length > 0) {
      throw new ValidationError(check[0].message);
    }

    const { email, password } = req.body;
    const isUserExist = await userRepository.findOneBy({
      email,
    });
    if (isUserExist) {
      throw new ExistingUserError("Такий корисутвач вже існує");
    }

    const hashedPassword = hashPassword(password);
    const user = new Users();
    user.email = email;
    user.password = hashedPassword;

    await userRepository.save(user);

    const token = jwt.sign({ email, password }, "secret", {
      expiresIn: "1h", // Термін дії токена
    });

    return res.status(201).json({ token });
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);

    const loginUser = await userRepository.findOneBy({
      email,
    });

    if (!loginUser || loginUser?.password !== hashedPassword) {
      throw new LoginError("Невірний email або пароль");
    }
    const token = jwt.sign(req.body, "secret", {
      expiresIn: "1h", // Термін дії токена
    });
    return res.status(200).json({ token });
  }

  async isUser(req: Request, res: Response) {
    try {
      if (req.user) {
        const decodedData = req.user as { email: string };
        return res.json(decodedData.email);
      }
    } catch (error) {
      throw new LoginError(error);
    }
  }
}

export default new UserController();
