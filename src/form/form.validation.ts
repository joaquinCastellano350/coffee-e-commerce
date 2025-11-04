import { z } from "zod";

export const createformSchema = z.object({
  name: z.string().min(2).max(100),
  message: z.string().min(10).max(1000).optional(),
  phone: z.string().min(2),
  mail: z.email().min(2).max(100).optional(),
  interestedProduct: z.string().min(2).max(100).optional(),
});

export const updateformSchema = z.object({
  name: z.string().min(2).max(100),
  message: z.string().min(10).max(1000).optional(),
  phone: z.string().min(2),
  mail: z.email().min(2).max(100).optional(),
});
