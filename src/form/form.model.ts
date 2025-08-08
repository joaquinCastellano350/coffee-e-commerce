import {Schema, model, Document, ObjectId} from 'mongoose';
import slugify from 'slugify';
export interface Iform extends Document {
    name: string,
    slug: string,
    message: string,
    email: string,
    phone: string,
}

const formSchema = new Schema<Iform>({
    name: {type: String, required: true, trim: true},
    slug: {type: String, required: true, unique: true, lowercase: true},
    message: {type: String, required: true, unique: true, lowercase: true},
    email: {type: String, required: false},
    phone: {type: String, required: false},
}, {timestamps: true})


export const formModel = model<Iform>('Contact', formSchema)


