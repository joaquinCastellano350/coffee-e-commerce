import { Router } from "express";
import { ProductController } from "./product.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.validation.js";

export class ProductRouter {
    public readonly router = Router();
    constructor(productController: ProductController) {
        this.router.get("/", productController.getAllProducts);
        this.router.get("/:id", productController.getProductById);
        this.router.post("/", validate(createProductSchema), productController.createProduct);
        this.router.put("/:id", validate(updateProductSchema), productController.updateProduct);
        this.router.delete("/:id", productController.deleteProduct);
    }
}