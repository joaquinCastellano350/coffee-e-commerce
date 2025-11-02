import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
  setPassword(plain: string): Promise<void>;
  validatePassword(plain: string): Promise<boolean>;
}


const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','user'], default: 'user' },
}, { timestamps: true });


userSchema.methods.setPassword = async function (plain: string) {
  this.passwordHash = await bcrypt.hash(plain, 10);
};
userSchema.methods.validatePassword = function (plain: string) {
  return bcrypt.compare(plain, this.passwordHash);
};

export const UserModel = model<IUser>('User', userSchema);
