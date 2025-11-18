import { IForm, formModel } from "./form.model.js";
import { FormRepository } from "./form.repository.interface.js";
export class MongoFormRepository implements FormRepository {
  async findAll(limit?: number): Promise<IForm[]> {
    const form = await formModel
      .find()
      .sort({ createdAt: -1 })
      .populate("interestedProduct", "name")
      .limit(limit || 0)
      .exec();
    return form;
  }
  async countLatests(date: Date) {
    const total = await formModel.countDocuments({
      createdAt: { $gte: date },
    });
    return total;
  }
  async findOne(id: string): Promise<IForm | null> {
    const form = await formModel.findById(id);
    return form;
  }
  async add(data: Partial<IForm>): Promise<IForm | null> {
    const form = new formModel(data);
    return await form.save();
  }
  async update(id: string, data: Partial<IForm>): Promise<IForm | null> {
    const form = await formModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return form;
  }
  async delete(id: string): Promise<IForm | null> {
    const form = await formModel.findOneAndDelete({ _id: id });
    return form;
  }

  async mostAskedProducts() {
    const products = await formModel.aggregate([
      {
        $group: {
          _id: "$interestedProduct",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      { $limit: 10 },
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
        },
      },
    ]);
    return products;
  }
}
