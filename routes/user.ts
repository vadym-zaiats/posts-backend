import express, { Router } from "express";
import bodyParser from "body-parser";
import UserController from "../controllers/user";
import passport from "passport";

class UserRouter {
  router: Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.use(bodyParser.json());
    this.router.post("/register", UserController.signUp);
    this.router.post("/login", UserController.signIn);
    this.router.get(
      "/user",
      passport.authenticate("bearer", { session: false }),
      UserController.isUser
    );
  }
}

export default new UserRouter().router;
