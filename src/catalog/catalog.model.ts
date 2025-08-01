import {model, Schema, Document} from 'mongoose';

export interface ICatalog extends Document {
    name: string,
    description: string,
    slug: string,
    products: [],
    visible: boolean
}

const catalogSchema = new Schema<ICatalog>({
    name: {type: String, required: true, trim: true},
    description: {type: String, required: false},
    slug: {type: String, required: true, unique: true, lowercase: true},
    products: [
        {type: Schema.Types.ObjectId, ref: 'Product'}
    ],
    visible :{type: Boolean, default: true}
},{timestamps: true})

export const CatalogModel = model<ICatalog>('Catalog', catalogSchema)