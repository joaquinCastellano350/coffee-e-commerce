import {Request, Response, NextFunction} from 'express';
import {CategoryService} from './category.service.js';

const categoryService = new CategoryService();

export class CategoryController {
    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await categoryService.getCategoryBySlug(req.params.slug);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const createdCategory = await categoryService.createCategory(req.body);
            res.status(201).json(createdCategory);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
            res.status(200).json(updatedCategory);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedCategory = await categoryService.deleteCategory(req.params.id);
            res.status(204).json(deletedCategory);
        } catch (error) {
            next(error);
        }
    }
}