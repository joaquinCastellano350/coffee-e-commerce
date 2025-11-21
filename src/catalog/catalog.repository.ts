import { ICatalog, CatalogModel } from "./catalog.model.js";
import { CatalogRepository } from "./catalog.repository.interface.js";

export class MongoCatalogRepository implements CatalogRepository {
  async findBySlug(slug: string): Promise<ICatalog | null> {
    const catalog = await CatalogModel.findOne({ slug });
    return catalog;
  }

  async add(data: ICatalog): Promise<ICatalog> {
    const newCatalog = new CatalogModel(data);
    return await newCatalog.save();
  }

  async findAll(): Promise<ICatalog[]> {
    const catalogs = await CatalogModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "catalog_id",
          as: "productsList",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          visible: 1,
          description: 1,
          startedAt: 1,
          endedAt: 1,
          totalProducts: { $size: "$productsList" },
        },
      },
    ]);
    return catalogs;
  }

  async findById(id: string): Promise<ICatalog | null> {
    const catalog = await CatalogModel.findById(id);
    return catalog;
  }

  async update(id: string, data: Partial<ICatalog>): Promise<ICatalog | null> {
    const catalog = await CatalogModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return await catalog;
  }

  async delete(id: string): Promise<ICatalog | null> {
    const catalog = await CatalogModel.findByIdAndDelete(id);
    return catalog;
  }

  async disable(id: string): Promise<ICatalog | null> {
    const catalog = await CatalogModel.findByIdAndUpdate(
      id,
      { visible: false },
      { new: true }
    );
    return catalog;
  }
  async enable(id: string): Promise<ICatalog | null> {
    await CatalogModel.updateMany({ visible: true }, { visible: false });
    const catalog = await CatalogModel.findByIdAndUpdate(
      id,
      { visible: true },
      { new: true }
    );

    return catalog;
  }
  async findActive(): Promise<ICatalog | null> {
    const catalog = await CatalogModel.findOne({ visible: true });
    return catalog;
  }
}
