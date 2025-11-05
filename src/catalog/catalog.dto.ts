import { Document } from "mongoose";


export interface CatalogProduct extends Document {
    _id: unknown;
    name: string;
    description?: string;
    price: number;
    stock: number;
    brand?: string;
    imageURL?: string;
    category_id?: string[];
    tags?: string[];
}

export interface CatalogProducts {
    products: CatalogProduct[];
    total: number;
    page: number;
    pages: number;
}