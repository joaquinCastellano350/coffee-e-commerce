import { MongoCatalogRepository } from "./catalog.repository.js";
import { ICatalog } from "./catalog.model.js";
import { AppError } from "../utils/AppError.js";
import { MongoProductRepository } from "../product/product.repository.js";

const catalogRepository = new MongoCatalogRepository();
const productRepository = new MongoProductRepository();

export class CatalogService {
    async getCatalogProducts(slug: string, filters: any): Promise<any> {
        let catalog;
        if (slug === "catalog"){
            catalog = await catalogRepository.findActive();
        }
        else {
            catalog = await catalogRepository.findBySlug(slug);
        }
        if (!catalog) {
            throw new AppError("There are no visible catalogs", 404);
        }
        filters.catalog_id = catalog._id;
        const products = await productRepository.findByFilters(filters);
        return products;
    }
    async createCatalog(data: ICatalog): Promise<ICatalog> {
        const catalog = await catalogRepository.add(data);
        return catalog;
    }

    async getAllCatalogs(): Promise<ICatalog[]> {
        const catalogs = await catalogRepository.findAll();
        if (catalogs.length === 0) {
            throw new AppError("No catalogs found", 404);
        }
        return catalogs;
    }

    async getCatalogById(id: string): Promise<ICatalog | null> {
        const catalog = await catalogRepository.findById(id);
        if (!catalog) {
            throw new AppError("Catalog not found", 404);
        }
        return catalog;
    }

    async updateCatalog(id: string, data: Partial<ICatalog>): Promise<ICatalog | null> {
        const catalog = await catalogRepository.update(id, data);
        if (!catalog) {
            throw new AppError("Catalog not found or could not be updated", 404);
        }
        return catalog;
    }

    async deleteCatalog(id: string): Promise<ICatalog | null> {
        const catalog = await catalogRepository.delete(id);
        if (!catalog) {
            throw new AppError("Catalog not found or could not be deleted", 404);
        }
        return catalog;
    }

    async disableCatalog(id: string): Promise<ICatalog | null> {
        const catalog = await catalogRepository.disable(id);
        if (!catalog) {
            throw new AppError("Catalog not found or could not be disabled", 404);
        }
        return catalog;
    }

    async enableCatalog(id: string): Promise<ICatalog | null> {
        const catalog = await catalogRepository.enable(id);
        if (!catalog) {
            throw new AppError("Catalog not found or could not be enabled", 404);
        }
        return catalog;
    }
}