import { MongoProductRepository } from "./product.repository.js";
import { AppError } from "../utils/AppError.js";
import { IProduct } from "./product.model.js";
import { MongoCatalogRepository } from "../catalog/catalog.repository.js";

export class ProductService {
  private productRepository: MongoProductRepository;
  private catalogRepository: MongoCatalogRepository;
  constructor(
    productRepository: MongoProductRepository,
    catalogRepository: MongoCatalogRepository
  ) {
    this.productRepository = productRepository;
    this.catalogRepository = catalogRepository;
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll();
    if (products.length === 0) {
      throw new AppError("No products found", 404);
    }
    return products;
  }
  async countActive() {
    const catalog = await this.catalogRepository.findActive();
    if (!catalog) {
      throw new AppError("No active catalogs", 404);
    }
    const catalog_id = String(catalog._id);
    const total = await this.productRepository.count({ catalog_id });
    return total;
  }
  async getProductById(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }
  async createProduct(data: Partial<IProduct>) {
    if (data.tags) {
      data.tags = (data.tags as string).split(",").map((t) => t.trim());
    }
    const product = await this.productRepository.add(data);
    return product;
  }

  async updateProduct(id: string, data: Partial<IProduct>) {
    if (data.tags) {
      data.tags = (data.tags as string).split(",").map((t) => t.trim());
    }
    const updatedProduct = await this.productRepository.update(id, data);
    if (!updatedProduct) {
      throw new AppError("Product not found or could not be updated", 404);
    }
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const deletedProduct = await this.productRepository.delete(id);
    if (!deletedProduct) {
      throw new AppError("Product not found or could not be deleted", 404);
    }
    return deletedProduct;
  }
}
