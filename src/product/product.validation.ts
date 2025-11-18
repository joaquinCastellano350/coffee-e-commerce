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
  description: z.string().max(1000).optional(),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0).default(0),
  brand: z.string().min(2).max(50).optional(),
  category_id: z.string().regex(/^[a-f\d]{24}$/),
  catalog_id: z.string().regex(/^[a-f\d]{24}$/i),
  tags: z.string().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(1000).optional(),
  price: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().min(0).default(0).optional(),
  brand: z.string().min(2).max(50).optional(),
  category_id: z
    .string()
    .regex(/^[a-f\d]{24}$/i)
    .optional(),
  catalog_id: z
    .string()
    .regex(/^[a-f\d]{24}$/i)
    .optional(),
  tags: z.string().optional(),
});
