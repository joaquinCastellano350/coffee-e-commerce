import {z} from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['user', 'admin']).optional(),
});
export type  RegisterDTO = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type  LoginDTO = z.infer<typeof LoginSchema>;

export type UserResponseDTO = {
    id: string;
    email: string;
    role: 'user' | 'admin';
    createdAt?: string;
}
