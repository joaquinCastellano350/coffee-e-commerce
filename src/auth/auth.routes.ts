import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { LoginSchema, RegisterSchema } from "./../user/user.dto.js";
import { requireAuth, requireRole } from "../auth/auth.middleware.js";

export class AuthRouter {
  public readonly router = Router();
  constructor(private authController: AuthController) {
    this.router.post(
      "/register",
      validate(RegisterSchema),
      this.authController.register
    );
    this.router.post(
      "/login",
      validate(LoginSchema),
      this.authController.login
    );
    this.router.post("/logout", this.authController.logout);
    this.router.post("/refresh", this.authController.refresh);
    this.router.get("/me", requireAuth, this.authController.getMe);
    this.router.get(
      "/users",
      requireAuth,
      requireRole("admin"),
      this.authController.getAllUsers
    );
    this.router.get(
      "/users/wishlist/count",
      requireAuth,
      requireRole("admin"),
      this.authController.getWishlists
    );
    this.router.get(
      "/users/wishlist/favorites",
      requireAuth,
      requireRole("admin"),
      this.authController.mostWishedProducts
    );
    this.router.patch(
      "/change-role/:userEmail/:role",
      requireAuth,
      requireRole("admin"),
      this.authController.changeRole
    );
  }
}
