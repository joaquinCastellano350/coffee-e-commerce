import { ICatalog } from "./catalog.model.js";

export interface CatalogRepository {
    findAll() : Promise<ICatalog[]>;
    findById(id: any): Promise<ICatalog | null>;
    add(catalog: Partial<ICatalog>): Promise<ICatalog | null>;
    update(id: any, catalog: Partial<ICatalog>): Promise<ICatalog | null>;
    delete(id: any): Promise<ICatalog | null>;
    disable(id: any): Promise<ICatalog | null>;
    enable(id: any): Promise<ICatalog | null>;
}