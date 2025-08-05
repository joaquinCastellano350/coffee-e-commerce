import { CategoryController } from "./category.controller.js";
import { Router } from "express";
import { createCategorySchema, updateCategorySchema } from "./category.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

const categoryController = new CategoryController();
export const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:slug", categoryController.getCategoryBySlug);
categoryRouter.post("/",validate(createCategorySchema),categoryController.createCategory);
categoryRouter.put("/:id", validate(updateCategorySchema), categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);
