/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Validator from "fastest-validator";
import crypto from "crypto";

export const validateService = new Validator();

export const userSchema = {
  email: { type: "email" },
  password: { type: "string", min: 6 },
  confirmPassword: { type: "equal", field: "password" },
};

export const checkUserService = validateService.compile(userSchema);

export function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
