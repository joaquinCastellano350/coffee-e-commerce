import { MongoProductRepository } from "./product.repository.js";
import { AppError } from "../utils/AppError.js";
import { IProduct } from "./product.model.js";

export class ProductService {
  private productRepository: MongoProductRepository;

  constructor(productRepository: MongoProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll();
    if (products.length === 0) {
      throw new AppError("No products found", 404);
    }
    return products;
  }
  async getProductById(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }
  async createProduct(data: Partial<IProduct>) {
    const product = await this.productRepository.add(data);
    return product;
  }

  async updateProduct(id: string, data: Partial<IProduct>) {
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
