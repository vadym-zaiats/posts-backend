import express, { Router } from "express";
import bodyParser from "body-parser";
import UserController from "../controllers/user";
import { tryCatch } from "../services/trycatch";
import passport from "passport";

class UserRouter {
  router: Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.use(bodyParser.json());
    this.router.post("/register", tryCatch(UserController.signUp));
    this.router.post("/login", tryCatch(UserController.signIn));
    this.router.get(
      "/user",
      passport.authenticate("bearer", { session: false }),
      tryCatch(UserController.isUser)
    );
  }
}

export default new UserRouter().router;
