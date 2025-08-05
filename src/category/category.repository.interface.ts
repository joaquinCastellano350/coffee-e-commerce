import { ICategory } from "./category.model.js";

export interface CategoryRepository {
    findAll() : Promise<ICategory[]>;
    add(data: Partial<ICategory>): Promise<ICategory | null>;
    update(id: any, category: Partial<ICategory>): Promise<ICategory | null>;
    delete(id: any): Promise<ICategory | null>;
}