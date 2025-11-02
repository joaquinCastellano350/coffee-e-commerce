import dotenv from 'dotenv';
import { connectDB } from '../src/config/mongoose.js';
import { UserModel } from '../src/user/user.model.js';

dotenv.config();
await connectDB();

const email = process.env.ADMIN_EMAIL!;
const pass  = process.env.ADMIN_PASSWORD!;

let admin = await UserModel.findOne({ email });
if (!admin) {
  admin = new UserModel({ email, role: 'admin', passwordHash: 'pending' });
  await admin.setPassword(pass);
  await admin.save();
  console.log('Admin created:', email);
} else {
  console.log('Admin already exists:', email);
}
process.exit(0);
