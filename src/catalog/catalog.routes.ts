import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { CatalogController } from "./catalog.controller.js";
import { createCatalogSchema, updateCatalogSchema } from "./catalog.validation.js";
import parseFilters from "../middlewares/parseFilters.js";

const catalogController = new CatalogController();
export const catalogRouter = Router();

catalogRouter.post("/", validate(createCatalogSchema), catalogController.createCatalog);
catalogRouter.get("/", catalogController.getAllCatalogs);
catalogRouter.get("/slug/:slug", catalogController.getCatalogBySlug);
catalogRouter.get("/id/:id", catalogController.getCatalogById);
catalogRouter.get("/slug/:slug/products", parseFilters, catalogController.getCatalogProducts);
catalogRouter.put("/id/:id", validate(updateCatalogSchema), catalogController.updateCatalog);
catalogRouter.delete("/id/:id", catalogController.deleteCatalog);
catalogRouter.patch("/id/:id/disable", catalogController.disableCatalog);
catalogRouter.patch("/id/:id/enable", catalogController.enableCatalog);