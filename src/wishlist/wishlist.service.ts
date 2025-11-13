import { MongoUserRepository } from "../user/user.repository";
import { MongoProductRepository } from "../product/product.repository";
import { AppError } from "../utils/AppError.js";

export class WishlistService {

    constructor(private userRepository: MongoUserRepository, private productRepository: MongoProductRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    async getLocalWishlist(productsIds: string[]) {
        try {
            const products = await this.productRepository.findMany(productsIds);
            return products;
        } catch (error) {
            throw new AppError('Error fetching local wishlist', 500);
        }
    }

    async getAll(userId: string) {
        try {
            const wishlist = await this.userRepository.getWishlist(userId);
            if (!wishlist) {
                throw new AppError('Wishlist not found', 404);
            }
            return wishlist;
        } catch (error) {
            throw new AppError('Error fetching wishlist', 500);
        }
    }

    async add(userId: string, productId: string) {
        try {
            const product = await this.productRepository.findOne(productId);
            if (!product) {
                throw new AppError('Cannot find product', 404);
            }
            const update = await this.userRepository.updateWishlist(userId, [productId]);
            return update
        } catch (error) {
            throw new AppError('Error adding to wishlist', 500);
        }
    }

    async remove(userId: string, productId: string) {
        try {
            await this.userRepository.removeFromWishlist(userId, productId);
        } catch (error) {
            throw new AppError('Error removing from wishlist', 500);
        }
    }

    async merge(userId: string, productsIds: string[]) {
        try {

            const products = await this.productRepository.findMany(productsIds);
            if (!products || products.length === 0) {
                throw new AppError('Cannot find products', 404);
            }
            const update = await this.userRepository.updateWishlist(userId, productsIds);
            return update
        } catch (error) {
            throw new AppError('Error merging withlist wishlist', 500);
        }
    }
}