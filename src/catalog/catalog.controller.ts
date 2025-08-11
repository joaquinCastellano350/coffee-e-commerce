import {Request, Response, NextFunction} from 'express';
import {CatalogService} from './catalog.service.js';
import {FilteredRequest} from '../middlewares/parseFilters.js';
const catalogService = new CatalogService();

export class CatalogController {
    async getCatalogProducts(req: FilteredRequest, res: Response, next: NextFunction) {
        try {
            const slug = req.params.slug;
            const products = await catalogService.getCatalogProducts(slug, req.filters);
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
    async getCatalogBySlug(req: Request, res: Response, next: NextFunction) {
        try {
            const slug = req.params.slug;
            const catalog = await catalogService.getCatalogBySlug(slug);
            res.status(200).json(catalog);
        } catch (error) {
            next(error);
        }
    }
    async createCatalog(req: Request, res: Response, next: NextFunction) {
        try {
            const newCatalog = await catalogService.createCatalog(req.body);
            res.status(201).json(newCatalog);
        } catch (error) {
            next(error);
        }
    }

    async getAllCatalogs(req: Request, res: Response, next: NextFunction) {
        try {
            const catalogs = await catalogService.getAllCatalogs();
            res.status(200).json(catalogs);
        } catch (error) {
            next(error);
        }
    }

    async getCatalogById(req: Request, res: Response, next: NextFunction) {
        try {
            const catalog = await catalogService.getCatalogById(req.params.id);
            res.status(200).json(catalog);
        } catch (error) {
            next(error);
        }
    }

    async updateCatalog(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedCatalog = await catalogService.updateCatalog(req.params.id, req.body);
            res.status(200).json(updatedCatalog);
        } catch (error) {
            next(error);
        }
    }

    async deleteCatalog(req: Request, res: Response, next: NextFunction) {
        try {
            await catalogService.deleteCatalog(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async disableCatalog(req: Request, res: Response, next: NextFunction) {
        try {
            const disabledCatalog = await catalogService.disableCatalog(req.params.id);
            res.status(200).json(disabledCatalog);
        } catch (error) {
            next(error);
        }
    }

    async enableCatalog(req: Request, res: Response, next: NextFunction) {
        try {
            const enabledCatalog = await catalogService.enableCatalog(req.params.id);
            res.status(200).json(enabledCatalog);
        } catch (error) {
            next(error);
        }
    }
}