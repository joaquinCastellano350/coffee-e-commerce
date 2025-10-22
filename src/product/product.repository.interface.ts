import { IProduct } from "./product.model.js";

export interface ProductRepository {
  findAll(): Promise<IProduct[]>;
  findOne(id: string): Promise<IProduct | null>;
  // PARA OTRA US --> findByCategory(cat_id: any): Promise<IProduct[]>;
  add(data: Partial<IProduct>): Promise<IProduct | null>;
  update(id: string, data: Partial<IProduct>): Promise<IProduct | null>;
  delete(id: string): Promise<IProduct | null>;
}
