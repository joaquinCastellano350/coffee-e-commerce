import {Schema, model, Document, ObjectId} from 'mongoose';
import slugify from 'slugify';
export interface Icontact extends Document {
    name: string,
    slug: string,
    menssage: string,
    email: string,
    phone: number,
}

const formSchema = new Schema<Icontact>({
    name: {type: String, required: true, trim: true},
    slug: {type: String, required: true, unique: true, lowercase: true},
    menssage: {type: String, required: true, unique: true, lowercase: true},
    email: {type: String, required: false},
    phone: {type: Number, required: false},
}, {timestamps: true})

formSchema.pre('validate', function(next) {
    if (this.name && this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true , strict: true });
    }
    next();
});

export const formModel = model<Icontact>('Contact', formSchema)
