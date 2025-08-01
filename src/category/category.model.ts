import {Schema, Document, model} from 'mongoose'

export interface ICategory extends Document {
    name: string,
    slug: string,
}

const categorySchema = new Schema<ICategory>({
    name: {type: String, required: true, unique: true, trim: true},
    slug: {type: String, required: true, unique: true, lowercase: true}
})

export const CategoryModel = model<ICategory>('Category', categorySchema)