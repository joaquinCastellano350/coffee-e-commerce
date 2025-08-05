import {z} from 'zod';

export const createformSchema = z.object({
    name: z.string().min(2).max(100),
    menssage: z.string().min(10).max(1000).optional(),
    phone: z.number().min(0),
    mail: z.string().min(2).max(100).optional(),
    // NOT Validated YET --> imageUrl: z.url(),
});

export const updateformSchema = z.object({
    name: z.string().min(2).max(100),
    menssage: z.string().min(10).max(1000).optional(),
    phone: z.number().min(0),
    mail: z.string().min(2).max(100).optional(),
    // NOT Validated YET --> imageUrl: z.url().optional(),
});