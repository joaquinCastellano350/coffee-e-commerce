import { ICatalog } from "./catalog.model.js";

export interface CatalogRepository {
    findAll() : Promise<ICatalog[]>;
    add(catalog: Partial<ICatalog>): Promise<ICatalog | undefined>;
    update(id: any, catalog: Partial<ICatalog>): Promise<ICatalog | undefined>;
    delete(id: any): Promise<ICatalog>;
    disable(id: any): any;
}