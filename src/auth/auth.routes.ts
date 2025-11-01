import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { LoginSchema, RegisterSchema } from "./../user/user.dto.js";

export class AuthRouter {
    public readonly router = Router();
    constructor(private authController: AuthController) {

        this.router.post('/register', validate(RegisterSchema), this.authController.register);
        this.router.post('/login',    validate(LoginSchema),    this.authController.login);
        this.router.post('/logout',   this.authController.logout);
        this.router.post('/refresh',  this.authController.refresh);

    }
}