import {IForm, formModel} from "./form.model.js"
import { FormRepository } from "./form.repository.interface.js";
export class MongoFormRepository implements FormRepository {
    async findAll(): Promise<IForm[]> {
        const form = await formModel.find();
        return form;
    }
    async findOne(id: any): Promise<IForm | null> {
        const form = await formModel.findById(id)
        return form;
    }
    async add(data: Partial<IForm>): Promise<IForm | null> {
        const form = new formModel(data);
        return await form.save();
    }
    async update(id: any, data: Partial<IForm>): Promise<IForm | null> {
        const form = await formModel.findOneAndUpdate({_id: id},data,{new: true})
        return form
    }
    async delete(id: any): Promise<IForm | null> {
        const form = await formModel.findOneAndDelete({_id: id});
        return form;
    }

} 