import { validate } from "../middlewares/validation.middleware.js";
import { CatalogController } from "./catalog.controller.js";
import { Router } from "express";
import { createCatalogSchema, updateCatalogSchema } from "./catalog.validation.js";

const catalogController = new CatalogController();
export const catalogRouter = Router();

catalogRouter.post("/", validate(createCatalogSchema), catalogController.createCatalog);
catalogRouter.get("/", catalogController.getAllCatalogs);
catalogRouter.get("/:id", catalogController.getCatalogById);
catalogRouter.get("/:slug/products", catalogController.getProductsByCatalogSlug);
catalogRouter.put("/:id", validate(updateCatalogSchema), catalogController.updateCatalog);
catalogRouter.delete("/:id", catalogController.deleteCatalog);
catalogRouter.patch("/:id/disable", catalogController.disableCatalog);
catalogRouter.patch("/:id/enable", catalogController.enableCatalog);