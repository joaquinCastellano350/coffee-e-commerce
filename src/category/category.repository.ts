import { CategoryRepository } from "./category.repository.interface.js";
import { ICategory, CategoryModel } from "./category.model.js";

export class MongoCategoryRepository implements CategoryRepository {
  async findAll(): Promise<ICategory[]> {
    const categories = await CategoryModel.find();
    return categories;
  }

  async findOneBySlug(slug: string): Promise<ICategory | null> {
    const category = await CategoryModel.findOne({ slug });
    return category;
  }
  async findOneById(id: string): Promise<ICategory | null> {
    const category = await CategoryModel.findById(id);
    return category;
  }

  async add(data: Partial<ICategory>): Promise<ICategory | null> {
    const category = new CategoryModel(data);
    return await category.save();
  }

  async update(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
    const category = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return category;
  }

  async delete(id: string): Promise<ICategory | null> {
    const category = await CategoryModel.findByIdAndDelete(id);
    return category;
  }
}
