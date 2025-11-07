import { MongoCatalogRepository } from "./catalog.repository.js";
import { ICatalog } from "./catalog.model.js";
import { AppError } from "../utils/AppError.js";
import { MongoProductRepository } from "../product/product.repository.js";

export class CatalogService {
  private catalogRepository: MongoCatalogRepository;
  private productRepository: MongoProductRepository;

  constructor(
    catalogRepository: MongoCatalogRepository,
    productRepository: MongoProductRepository,
  ) {
    this.catalogRepository = catalogRepository;
    this.productRepository = productRepository;
  }

  async getCatalogBySlug(slug: string) {
    const catalog = await this.catalogRepository.findBySlug(slug);
    if (!catalog) {
      throw new AppError("Catalog not found", 404);
    }
    return catalog;
  }
  async getCatalogProducts(slug: string, filters: Record<string, string | number>) {
    let catalog;
    if (slug === "catalog") {
      catalog = await this.catalogRepository.findActive();
    } else {
      catalog = await this.catalogRepository.findBySlug(slug);
    }
    if (!catalog) {
      throw new AppError("There are no visible catalogs", 404);
    }
    filters.catalog_id = String(catalog._id);

    const page = Number(filters.page);
    const skip = (Number(filters.page) - 1) * Number(filters.limit);
    const limit = Number(filters.limit);
    delete filters.page;
    delete filters.limit;


    const [products, total] = await Promise.all( [this.productRepository.findByFilters(skip , limit , filters), this.productRepository.count(filters)] );
    return {
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
  async createCatalog(data: ICatalog): Promise<ICatalog> {
    const catalog = await this.catalogRepository.add(data);
    return catalog;
  }

  async getAllCatalogs(): Promise<ICatalog[]> {
    const catalogs = await this.catalogRepository.findAll();
    if (catalogs.length === 0) {
      throw new AppError("No catalogs found", 404);
    }
    return catalogs;
  }

  async getCatalogById(id: string): Promise<ICatalog | null> {
    const catalog = await this.catalogRepository.findById(id);
    if (!catalog) {
      throw new AppError("Catalog not found", 404);
    }
    return catalog;
  }

  async updateCatalog(
    id: string,
    data: Partial<ICatalog>,
  ): Promise<ICatalog | null> {
    const catalog = await this.catalogRepository.update(id, data);
    if (!catalog) {
      throw new AppError("Catalog not found or could not be updated", 404);
    }
    return catalog;
  }

  async deleteCatalog(id: string): Promise<ICatalog | null> {
    const catalog = await this.catalogRepository.delete(id);
    if (!catalog) {
      throw new AppError("Catalog not found or could not be deleted", 404);
    }
    return catalog;
  }

  async disableCatalog(id: string): Promise<ICatalog | null> {
    const catalog = await this.catalogRepository.disable(id);
    if (!catalog) {
      throw new AppError("Catalog not found or could not be disabled", 404);
    }
    return catalog;
  }

  async enableCatalog(id: string): Promise<ICatalog | null> {
    const catalog = await this.catalogRepository.enable(id);
    if (!catalog) {
      throw new AppError("Catalog not found or could not be enabled", 404);
    }
    return catalog;
  }
}
