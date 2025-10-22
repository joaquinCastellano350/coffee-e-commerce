import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service.js";

export class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
    this.createCategory = this.createCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getCategoryBySlug = this.getCategoryBySlug.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryService.getCategoryBySlug(
        req.params.slug,
      );
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const createdCategory = await this.categoryService.createCategory(
        req.body,
      );
      res.status(201).json(createdCategory);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        req.params.id,
        req.body,
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedCategory = await this.categoryService.deleteCategory(
        req.params.id,
      );
      res.status(204).json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
}
