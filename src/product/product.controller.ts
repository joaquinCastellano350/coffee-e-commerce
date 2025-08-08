import {NextFunction, Request, Response} from 'express';
import {ProductService} from './product.service.js';

const productService = new ProductService();

export class ProductController {
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const createdProduct = await productService.createProduct(req.body);
            res.status(201).json(createdProduct);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedProduct = await productService.updateProduct(req.params.id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedProduct = await productService.deleteProduct(req.params.id);
            res.status(204).json(deletedProduct);
        } catch (error) {
            next(error);
        }
    }
}