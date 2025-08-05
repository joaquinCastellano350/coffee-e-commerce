import { ICategory, CategoryModel } from "./category.model";
import { CategoryRepository } from "./category.repository.interface";

export class MongoCategoryRepository implements CategoryRepository{
    async findAll(): Promise<ICategory[]> {
        const categories = await CategoryModel.find()
        return categories
    }
    async add(data: Partial<ICategory>): Promise<ICategory | null> {
        const category = new CategoryModel(data);
        return await category.save();
    }
    async update(id: any, data: Partial<ICategory>): Promise<ICategory | null> {
        const category = await CategoryModel.findOneAndUpdate({_id: id}, data, {new: true});
        return category;
    }
    async delete(id: any): Promise<ICategory | null> {
        const category = await CategoryModel.findOneAndDelete({_id: id});
        return category;
    }

}