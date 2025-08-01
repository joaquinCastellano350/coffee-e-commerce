import { ICategory } from "./category.model.js";

export interface CategoryRepository {
    findAll() : Promise<ICategory[]>;
    findOne(slug: string): Promise<ICategory | undefined>;
    add(category: Partial<ICategory>): Promise<ICategory | undefined>;
    update(id: any, category: Partial<ICategory>): Promise<ICategory | undefined>;
    delete(id: any): Promise<ICategory>;
}