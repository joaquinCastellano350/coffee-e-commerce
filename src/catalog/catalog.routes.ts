import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { CatalogController } from "./catalog.controller.js";
import { createCatalogSchema, updateCatalogSchema } from "./catalog.validation.js";
import parseFilters from "../middlewares/parseFilters.js";

export class CatalogRouter {
    public readonly router = Router();

    constructor(catalogController: CatalogController) {
        this.router.post("/", validate(createCatalogSchema), catalogController.createCatalog);
        this.router.get("/", catalogController.getAllCatalogs);
        this.router.get("/slug/:slug", catalogController.getCatalogBySlug);
        this.router.get("/id/:id", catalogController.getCatalogById);
        this.router.get("/slug/:slug/products", parseFilters, catalogController.getCatalogProducts);
        this.router.put("/id/:id", validate(updateCatalogSchema), catalogController.updateCatalog);
        this.router.delete("/id/:id", catalogController.deleteCatalog);
        this.router.patch("/id/:id/disable", catalogController.disableCatalog);
        this.router.patch("/id/:id/enable", catalogController.enableCatalog);
    }
}