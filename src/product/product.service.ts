import { MongoProductRepository } from "./product.repository.js";
import { AppError } from "../utils/AppError.js";
import { Mongoose, Schema } from "mongoose";
import { IProduct } from "./product.model.js";

const productRepository = new MongoProductRepository();

export class ProductService {
    async getAllProducts() {
        const products = await productRepository.findAll();
        if (products.length === 0) {
            throw new AppError("No products found", 404);
        }
        return products;
    }
    async getProductById(id: string) {
        const product = await productRepository.findOne(id);
        if (!product) {
            throw new AppError("Product not found", 404);
        }
        return product;
    }
    async createProduct(data: Partial<IProduct>) {
        const product = await productRepository.add(data);
        return product;
    }

    async updateProduct(id: string, data: Partial<IProduct>) {
        const updatedProduct = await productRepository.update(id, data);
        if (!updatedProduct) {
            throw new AppError("Product not found or could not be updated", 404);
        }
        return updatedProduct;
    }

    async deleteProduct(id: string) {
        const deletedProduct = await productRepository.delete(id);
        if (!deletedProduct) {
            throw new AppError("Product not found or could not be deleted", 404);
        }
        return deletedProduct;
    }
}
