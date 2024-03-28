/* eslint-disable @typescript-eslint/ban-types */
import { type NextFunction, type Request, type Response } from "express";

export const tryCatch =
  (controller: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
