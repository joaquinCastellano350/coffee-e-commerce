import { ICategory } from "./category.model.js";

export interface CategoryRepository {
    findAll() : Promise<ICategory[]>;
    findOneBySlug(slug: string): Promise<ICategory | null>;
    findOneById(id: any): Promise<ICategory | null>;
    add(category: Partial<ICategory>): Promise<ICategory | null>;
    update(id: any, category: Partial<ICategory>): Promise<ICategory | null>;
    delete(id: any): Promise<ICategory | null>;
}