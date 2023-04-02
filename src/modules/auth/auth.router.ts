import { Router } from "express";
import { loginController, refreshTokenController } from "./auth.controller";
import { body } from "express-validator";

export const authRouter = Router();

authRouter.post("/login",
    body("username").isString().notEmpty(),
    body("password").isString().notEmpty(),
    loginController);

authRouter.post("/refresh",
    body("refresh_token").isString(),
    refreshTokenController);