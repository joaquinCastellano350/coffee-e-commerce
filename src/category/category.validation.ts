import {z } from 'zod';
import { objectIdSchema } from '../product/product.validation.js';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    parent_id: objectIdSchema.optional()
});
export const updateCategorySchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().optional(),
    parent_id: objectIdSchema.optional()
});