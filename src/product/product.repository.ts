
import { IProduct, ProductModel } from "./product.model.js";
import { ProductRepository } from "./product.repository.interface.js";

export class MongoProductRepository implements ProductRepository {
  async findByFilters(skip: number, limit: number, filters: Record<string, string | number | { $regex: RegExp }>) {

    if (filters.name) {
      const regex = new RegExp(filters.name as string, 'i');
      filters.name = { $regex: regex };
    }


    const products = await ProductModel.find(filters)
    .populate('category_id', 'name -_id')
    .select('_id name description price stock brand imageURL category_id tags')
    .skip(skip)
    .limit(limit);

    return products;
  }
  async count(filters: Record<string, string | number>) {
    const count = await ProductModel.countDocuments(filters);
    return count;
  }
  async findAll(): Promise<IProduct[]> {
    const products = await ProductModel.find();
    return products;
  }
  async findOne(id: string): Promise<IProduct | null> {
    const product = await ProductModel.findById(id).populate('category_id', 'name -_id');
    return product;
  }
  async findMany(ids: string[]): Promise<IProduct[]> {
    const products = await ProductModel.find({ _id: { $in: ids } }).populate('category_id', 'name -_id');
    return products;
  }
  async add(data: Partial<IProduct>): Promise<IProduct | null> {
    const product = new ProductModel(data);
    return await product.save();
  }
  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    const product = await ProductModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return product;
  }
  async delete(id: string): Promise<IProduct | null> {
    const product = await ProductModel.findOneAndDelete({ _id: id });
    return product;
  }
}
