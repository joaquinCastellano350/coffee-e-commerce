import { IUser } from './user.model.js';

export interface UserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  add(data: Partial<IUser>): Promise<IUser>;
}