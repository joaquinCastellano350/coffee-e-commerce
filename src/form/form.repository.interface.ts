import { Iform } from "./form.model.js";

export interface formRepository {
    findAll() : Promise<Iform[]>;
    findOne(id: any): Promise<Iform | null>;
    add(data: Partial<Iform>): Promise<Iform | null>;
    update(id: any, data: Partial<Iform>): Promise<Iform | null>;
    delete(id: any): Promise<Iform | null>;

}
