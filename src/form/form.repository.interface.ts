import { Icontact } from "./form.model.js";

export interface formRepository {
    findAll() : Promise<Icontact[]>;
    findOne(id: any): Promise<Icontact | null>;
    // PARA OTRA US -->findByCategory(cat_id: any): Promise<IProduct[]>;
    add(data: Partial<Icontact>): Promise<Icontact | null>;
    update(id: any, data: Partial<Icontact>): Promise<Icontact | null>;
    delete(id: any): Promise<Icontact | null>;

}
