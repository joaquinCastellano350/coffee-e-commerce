import { Schema, model, Document } from "mongoose";

export interface IForm extends Document {
  name: string;
  slug: string;
  message: string;
  email: string;
  phone: string;
}

const formSchema = new Schema<IForm>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    message: { type: String, required: true, lowercase: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
  },
  { timestamps: true },
);

export const formModel = model<IForm>("Form", formSchema);
