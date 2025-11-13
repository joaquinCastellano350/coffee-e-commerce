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
  async getWishlist(userId: string) {
    const user = await UserModel.findById(userId)
    return user?.wishlist || [];
  }
  async updateWishlist(userId: string, wishlist: string[]) {
      const result = await UserModel.findOneAndUpdate({_id: userId}, 
        {$addToSet: {wishlist: {$each: wishlist}}},
        {new: true},
      ).select('wishlist')
      return result;
    
  }
  async removeFromWishlist(userId: string, productId: string) {
    await UserModel.updateOne({
      _id: userId
    }, {
      $pull: { wishlist: productId }
    });
  }
}
