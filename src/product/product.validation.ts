import {z} from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(1000).optional(),
    price: z.number().min(0),
    brand: z.string().min(2).max(100).optional(),
    stock: z.number().optional()
    // NOT Validated YET --> imageUrl: z.url(),
});

export const updateProductSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().min(10).max(1000).optional(),
    price: z.number().min(0).optional(),
    brand: z.string().min(2).max(100).optional(),
    stock: z.number().optional()
    // NOT Validated YET --> imageUrl: z.url().optional(),
});