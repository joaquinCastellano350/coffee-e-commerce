import { ICatalog } from "./catalog.model.js";

export interface CatalogRepository {
  findAll(): Promise<ICatalog[]>;
  findById(id: string): Promise<ICatalog | null>;
  add(catalog: Partial<ICatalog>): Promise<ICatalog | null>;
  update(id: string, catalog: Partial<ICatalog>): Promise<ICatalog | null>;
  delete(id: string): Promise<ICatalog | null>;
  disable(id: string): Promise<ICatalog | null>;
  enable(id: string): Promise<ICatalog | null>;
}
