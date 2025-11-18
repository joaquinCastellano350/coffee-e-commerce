import { Router } from "express";
import { ProductController } from "./product.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.js";
import { requireAuth, requireRole } from "./../auth/auth.middleware.js";
import { upload } from "../config/multer.js";
export class ProductRouter {
  public readonly router = Router();
  constructor(productController: ProductController) {
    this.router.get("/count", productController.countActive);
    this.router.get("/:id", productController.getProductById);
    this.router.use(requireAuth, requireRole("admin"));
    this.router.get("/", productController.getAllProducts);
    this.router.post(
      "/",
      upload.single("image"),
      validate(createProductSchema),
      productController.createProduct
    );
    this.router.put(
      "/:id",
      upload.single("image"),
      validate(updateProductSchema),
      productController.updateProduct
    );
    this.router.delete("/:id", productController.deleteProduct);
  }
}
