import {NextFunction, Request, Response} from 'express';
import {ProductService} from './product.service.js';



export class ProductController {

    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
        this.createProduct = this.createProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await this.productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const createdProduct = await this.productService.createProduct(req.body);
            res.status(201).json(createdProduct);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedProduct = await this.productService.updateProduct(req.params.id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedProduct = await this.productService.deleteProduct(req.params.id);
            res.status(204).json(deletedProduct);
        } catch (error) {
            next(error);
        }
    }
}