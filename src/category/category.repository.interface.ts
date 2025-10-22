import { ICategory } from "./category.model.js";

export interface CategoryRepository {
  findAll(): Promise<ICategory[]>;
  findOneBySlug(slug: string): Promise<ICategory | null>;
  findOneById(id: string): Promise<ICategory | null>;
  add(category: Partial<ICategory>): Promise<ICategory | null>;
  update(id: string, category: Partial<ICategory>): Promise<ICategory | null>;
  delete(id: string): Promise<ICategory | null>;
}
