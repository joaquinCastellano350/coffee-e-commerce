import { Types } from "mongoose";
import { z } from "zod";

export const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  })
  .transform((val) => new Types.ObjectId(val));

export const createProductSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(1000).optional(),
  price: z.number().min(0),
  stock: z.number().min(0).default(0),
  brand: z.string().min(2).max(50).optional(),
  category_id: objectIdSchema.optional(),
  catalog_id: objectIdSchema.optional(),
  tags: z.array(z.string()).optional(),
  // NOT Validated YET --> imageUrl: z.url(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().min(10).max(1000).optional(),
  price: z.number().min(0).optional(),
  stock: z.number().min(0).default(0).optional(),
  brand: z.string().min(2).max(50).optional(),
  category_id: objectIdSchema.optional(),
  catalog_id: objectIdSchema.optional(),
  tags: z.array(z.string()).optional(),
  // NOT Validated YET --> imageUrl: z.url().optional(),
});
