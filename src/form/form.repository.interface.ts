import { IForm } from "./form.model.js";

export interface FormRepository {
    findAll() : Promise<IForm[]>;
    findOne(id: any): Promise<IForm | null>;
    add(data: Partial<IForm>): Promise<IForm | null>;
    update(id: any, data: Partial<IForm>): Promise<IForm | null>;
    delete(id: any): Promise<IForm | null>;

}
