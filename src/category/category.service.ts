import { MongoCategoryRepository } from "./category.repository.js";
import { AppError } from "../utils/AppError.js";
import { ICategory } from "./category.model.js";

const categoryRepository = new MongoCategoryRepository();

export class CategoryService {
    async getAllCategories() {
        const categories = await categoryRepository.findAll();
        if (categories.length === 0) {
            throw new AppError("No categories found", 404);
        }
        return categories;
    }

    async getCategoryBySlug(slug: string) {
        let category = await categoryRepository.findOneBySlug(slug);
        const result: ICategory[] = [];
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        while (category) {
            result.unshift(category);
            if (!category.parent_id) {
                break;
            }
            category = await categoryRepository.findOneById(category.parent_id);
        }
        return result;
    }

    async createCategory(data: Partial<ICategory>) {
        const category = await categoryRepository.add(data);
        return category;
    }

    async updateCategory(id: string, data: Partial<ICategory>) {
        const updatedCategory = await categoryRepository.update(id, data);
        if (!updatedCategory) {
            throw new AppError("Category not found or could not be updated", 404);
        }
        return updatedCategory;
    }

    async deleteCategory(id: string) {
        const deletedCategory = await categoryRepository.delete(id);
        if (!deletedCategory) {
            throw new AppError("Category not found or could not be deleted", 404);
        }
        return deletedCategory;
    }
}