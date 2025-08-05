import { Router } from "express";
import { ProductController } from "./product.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.validation.js";


export const productRouter = Router();

const productController = new ProductController();


productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", validate(createProductSchema), productController.createProduct);
productRouter.put("/:id", validate(updateProductSchema), productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

