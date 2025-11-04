import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service.js";
import { StorageService } from "../storage/storage.service.js";

export class ProductController {
  private productService: ProductService;
  private storageService: StorageService;

  constructor(productService: ProductService, storageService: StorageService) {
    this.productService = productService;
    this.storageService = storageService;

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
      const data = {...req.body};
      if (req.file) {
        const imageURL = await this.storageService.processImage(req.file);
        data.imageURL = imageURL;
      }
      const createdProduct = await this.productService.createProduct(data);
      
      res.status(201).json(createdProduct);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const data = {...req.body};
      if (req.file) {
        const prev = await this.productService.getProductById(id);
        if (prev.imageURL) await this.storageService.deleteFile(prev.imageURL);
        const imageURL = await this.storageService.processImage(req.file);
        data.imageURL = imageURL;
      }
      const updatedProduct = await this.productService.updateProduct(id, data);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const product = await this.productService.getProductById(id);
      if (product.imageURL) {
        await this.storageService.deleteFile(product.imageURL);
      }
      await this.productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
