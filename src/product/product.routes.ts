import { Router } from "express";
import { ProductController } from "./product.controller.js";

export const productRouter = Router();

const productController = new ProductController();


productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

