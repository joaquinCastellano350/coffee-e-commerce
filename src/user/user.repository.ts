import { IUser, UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.interface.js";

export class MongoUserRepository implements UserRepository {
    

  async findById(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }
  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  async add(data: Partial<IUser>) {
    return await UserModel.create(data);
  }
  
  
}
