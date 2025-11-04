import {z} from 'zod';

export const ProductsSchema = z.object({
  productsIds: z.array(z.string()).nonempty(),
});
export type  RegisterDTO = z.infer<typeof ProductsSchema>;

