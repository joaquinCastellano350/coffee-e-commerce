import { IUser, UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.interface.js";

export class MongoUserRepository implements UserRepository {
  async findAll(filters: Record<string, unknown>) {
    const users = await UserModel.find(filters).select("_id email role");
    return users;
  }

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
    const user = await UserModel.findById(userId);
    return user?.wishlist || [];
  }
  async updateWishlist(userId: string, wishlist: string[]) {
    const result = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { wishlist: { $each: wishlist } } },
      { new: true }
    ).select("wishlist");
    return result;
  }
  async removeFromWishlist(userId: string, productId: string) {
    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $pull: { wishlist: productId },
      }
    );
  }

  async countWishlsits() {
    const total = await UserModel.aggregate([
      {
        $project: {
          _id: 0,
          wishlistSize: { $size: "$wishlist" },
        },
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: "$wishlistSize" },
        },
      },
    ]);
    return total.length > 0 ? total[0].totalCount : 0;
  }
  async mostWishedProducts() {
    const products = await UserModel.aggregate([
      {
        $unwind: "$wishlist",
      },
      {
        $group: {
          _id: "$wishlist",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 0,
          count: "$count",
          name: "$productDetails.name",
          imageURL: "$productDetails.imageURL",
        },
      },
    ]);

    return products;
  }
}
