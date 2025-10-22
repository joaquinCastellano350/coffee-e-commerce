import { model, Schema, Document } from "mongoose";
import slugify from "slugify";

export interface ICatalog extends Document {
  name: string;
  description: string;
  slug: string;
  visible: boolean;
  startedAt: Date;
  endedAt: Date;
}

const catalogSchema = new Schema<ICatalog>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: false },
  slug: { type: String, required: true, unique: true, lowercase: true },
  visible: { type: Boolean, default: true },
  startedAt: { type: Date, required: false },
  endedAt: { type: Date, required: false },
});

catalogSchema.pre("validate", function (next) {
  if (this.name && this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

catalogSchema.index(
  { visible: 1 },
  { unique: true, partialFilterExpression: { visible: true } },
);

export const CatalogModel = model<ICatalog>("Catalog", catalogSchema);
