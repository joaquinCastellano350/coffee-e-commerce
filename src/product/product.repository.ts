import { IProduct, ProductModel } from "./product.model.js";
import { ProductRepository } from "./product.repository.interface.js";

export class MongoProductRepository implements ProductRepository {
  async findByFilters(filters: Record<string, string | number>) {
    const products = await ProductModel.find(filters);
    return products;
  }
  async findAll(): Promise<IProduct[]> {
    const products = await ProductModel.find();
    return products;
  }
  async findOne(id: string): Promise<IProduct | null> {
    const product = await ProductModel.findById(id);
    return product;
  }
  async findMany(ids: string[]): Promise<IProduct[]> {
    const products = await ProductModel.find({ _id: { $in: ids } });
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
