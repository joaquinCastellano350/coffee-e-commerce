import { z } from "zod";

export const createCatalogSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  visible: z.boolean().default(true),
  startedAt: z.coerce.date().optional(),
  endedAt: z.coerce.date().optional(),
});
export const updateCatalogSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(1000).optional(),
  visible: z.boolean().optional(),
  startedAt: z.coerce.date().optional(),
  endedAt: z.coerce.date().optional(),
});
