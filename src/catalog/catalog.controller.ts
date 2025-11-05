import { Request, Response, NextFunction } from "express";
import { CatalogService } from "./catalog.service.js";
import { FilteredRequest } from "../middlewares/parseFilters.js";

export class CatalogController {
  private catalogService: CatalogService;

  constructor(catalogService: CatalogService) {
    this.catalogService = catalogService;
    this.getCatalogProducts = this.getCatalogProducts.bind(this);
    this.getCatalogBySlug = this.getCatalogBySlug.bind(this);
    this.createCatalog = this.createCatalog.bind(this);
    this.getAllCatalogs = this.getAllCatalogs.bind(this);
    this.getCatalogById = this.getCatalogById.bind(this);
    this.updateCatalog = this.updateCatalog.bind(this);
    this.deleteCatalog = this.deleteCatalog.bind(this);
    this.disableCatalog = this.disableCatalog.bind(this);
    this.enableCatalog = this.enableCatalog.bind(this);
  }

  async getCatalogProducts(
    req: FilteredRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const slug = req.params.slug || 'catalog';
      const result = await this.catalogService.getCatalogProducts(
        slug,
        req.filters ?? {},
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async getCatalogBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug;
      const catalog = await this.catalogService.getCatalogBySlug(slug);
      res.status(200).json(catalog);
    } catch (error) {
      next(error);
    }
  }
  async createCatalog(req: Request, res: Response, next: NextFunction) {
    try {
      const newCatalog = await this.catalogService.createCatalog(req.body);
      res.status(201).json(newCatalog);
    } catch (error) {
      next(error);
    }
  }

  async getAllCatalogs(req: Request, res: Response, next: NextFunction) {
    try {
      const catalogs = await this.catalogService.getAllCatalogs();
      res.status(200).json(catalogs);
    } catch (error) {
      next(error);
    }
  }

  async getCatalogById(req: Request, res: Response, next: NextFunction) {
    try {
      const catalog = await this.catalogService.getCatalogById(req.params.id);
      res.status(200).json(catalog);
    } catch (error) {
      next(error);
    }
  }

  async updateCatalog(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCatalog = await this.catalogService.updateCatalog(
        req.params.id,
        req.body,
      );
      res.status(200).json(updatedCatalog);
    } catch (error) {
      next(error);
    }
  }

  async deleteCatalog(req: Request, res: Response, next: NextFunction) {
    try {
      await this.catalogService.deleteCatalog(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async disableCatalog(req: Request, res: Response, next: NextFunction) {
    try {
      const disabledCatalog = await this.catalogService.disableCatalog(
        req.params.id,
      );
      res.status(200).json(disabledCatalog);
    } catch (error) {
      next(error);
    }
  }

  async enableCatalog(req: Request, res: Response, next: NextFunction) {
    try {
      const enabledCatalog = await this.catalogService.enableCatalog(
        req.params.id,
      );
      res.status(200).json(enabledCatalog);
    } catch (error) {
      next(error);
    }
  }
}
