import { IProduct } from "./product.model.js";

export interface ProductRepository {
    findAll() : Promise<IProduct[]>;
    findOne(id: any): Promise<IProduct | null>;
    // PARA OTRA US --> findByCategory(cat_id: any): Promise<IProduct[]>;
    add(data: Partial<IProduct>): Promise<IProduct | null>;
    update(id: any, data: Partial<IProduct>): Promise<IProduct | null>;
    delete(id: any): Promise<IProduct | null>;

}