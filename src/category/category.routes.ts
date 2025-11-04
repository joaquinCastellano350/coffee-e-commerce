import { Router } from "express";
import { CategoryController } from "./category.controller.js";
import { requireAuth , requireRole } from "./../auth/auth.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

export class CategoryRouter {
  public readonly router = Router();

  constructor(categoryController: CategoryController) {
    this.router.get("/", categoryController.getAllCategories);
    this.router.get("/:slug", categoryController.getCategoryBySlug);

    this.router.use(requireAuth, requireRole("admin"));
    this.router.post(
      "/",
      validate(createCategorySchema),
      categoryController.createCategory,
    );
    this.router.put(
      "/:id",
      validate(updateCategorySchema),
      categoryController.updateCategory,
    );
    this.router.delete("/:id", categoryController.deleteCategory);
  }
}
