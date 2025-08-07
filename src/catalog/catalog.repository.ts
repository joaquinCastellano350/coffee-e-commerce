import { ICatalog, CatalogModel} from "./catalog.model.js";
import { CatalogRepository } from "./catalog.repository.interface.js";

export class MongoCatalogRepository implements CatalogRepository {
    async findBySlug(slug: string) {
        const catalog = await CatalogModel.findOne({ slug });
        return catalog;
    }

    async add(data: ICatalog): Promise<ICatalog> {
        const newCatalog = new CatalogModel(data);
        return await newCatalog.save();
    }
    
    async findAll(): Promise<ICatalog[]> {
        const catalogs = await CatalogModel.find();
        return catalogs;
    }

    async findById(id: string): Promise<ICatalog | null> {
        const catalog = await CatalogModel.findById(id);
        return catalog;
    }

    async update(id: string, data: Partial<ICatalog>): Promise<ICatalog | null> {
        const catalog = await CatalogModel.findByIdAndUpdate(id, data, { new: true })
        return await catalog;
    }

    async delete(id: string): Promise<ICatalog | null> {
        const catalog = await CatalogModel.findByIdAndDelete(id);
        return catalog;
    }

    async disable(id: string): Promise<ICatalog | null> {
        const catalog = await CatalogModel.findByIdAndUpdate(id, { visible: false }, { new: true });
        return catalog;
    }
    async enable(id: string): Promise<ICatalog | null> {
        const catalog = await CatalogModel.findByIdAndUpdate(id, { visible: true }, { new: true });
        return catalog;
    }
}