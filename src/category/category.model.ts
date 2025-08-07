import {Schema, Document, model, Types} from 'mongoose'
import slugify from 'slugify';

export interface ICategory extends Document {
    name: string,
    slug: string,
    parent_id?: Types.ObjectId | null
}

const categorySchema = new Schema<ICategory>({
    name: {type: String, required: true, unique: true, trim: true},
    slug: {type: String, required: true, unique: true, lowercase: true},
    parent_id: {type: Types.ObjectId, ref: 'Category', default: null}
})

categorySchema.pre('validate', function(next) {
    if (this.name && this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true , strict: true });
    }
    next();
});

export const CategoryModel = model<ICategory>('Category', categorySchema)