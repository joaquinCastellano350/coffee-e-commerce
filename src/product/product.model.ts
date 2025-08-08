import {Schema, model, Document, ObjectId} from 'mongoose';
import slugify from 'slugify';
import { CategoryModel } from '../category/category.model.js';
export interface IProduct extends Document {
    name: string,
    slug: string,
    price: number,
    stock: number,
    imageURL: string,
    description: string,
    brand: string,
    category_slug: string,
    catalog_id: Schema.Types.ObjectId,
    category_id: Schema.Types.ObjectId,
    tags: string[]
}

const productSchema = new Schema<IProduct>({
    name: {type: String, required: true, trim: true},
    slug: {type: String, required: true, unique: true, lowercase: true},
    description: {type: String, required: false},
    brand: {type: String, required: false},
    price: {type: Number, required: false},
    stock: {type: Number, default: 0},
    imageURL: {type: String, required: false},
    category_id: {type: Schema.Types.ObjectId, ref: 'Category', required: false},
    catalog_id: {type: Schema.Types.ObjectId, ref: 'Catalog', required: false},
    tags: {type: [String], required: false},
    category_slug: {type: String, required: false}
}, {timestamps: true})

productSchema.pre('validate', function(next) {
    if (this.name && this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true , strict: true });
    }
    next();
});
productSchema.pre('save', async function(next) {
    if (this.category_id && this.isModified('category_id')) {
        const category = await CategoryModel.findById(this.category_id);
        this.category_slug = category ? category.slug : '';
    }
    next();
});

export const ProductModel = model<IProduct>('Product', productSchema)