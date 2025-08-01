import { connectDB } from "../config/mongoose.js";
import {IProduct, ProductModel} from "./product.model.js"
import { ProductRepository } from "./product.repository.interface.js";

export class MongoProductRepository implements ProductRepository {
    constructor(){
        connectDB();
    }
    
    async findAll(): Promise<IProduct[]> {
        const products = await ProductModel.find();
        return products;
    }
    async findOne(id: any): Promise<IProduct | null> {
        const product = await ProductModel.findById(id)
        return product;
    }
    async add(data: Partial<IProduct>): Promise<IProduct | null> {
        const product = new ProductModel(data);
        return await product.save();
    }
    async update(id: any, data: Partial<IProduct>): Promise<IProduct | null> {
        const product = await ProductModel.findOneAndUpdate({_id: id},data,{new: true})
        return product
    }
    async delete(id: any): Promise<IProduct | null> {
        const product = await ProductModel.findOneAndDelete({_id: id});
        return product;
    }

} 