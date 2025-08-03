import {z} from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(1000).optional(),
    price: z.number().min(0),
    // NOT Validated YET --> imageUrl: z.url(),
});

export const updateProductSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().min(10).max(1000).optional(),
    price: z.number().min(0).optional(),
    // NOT Validated YET --> imageUrl: z.url().optional(),
});