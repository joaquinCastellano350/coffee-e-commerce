import {Iform, formModel} from "./form.model.js"
import { formRepository } from "./form.repository.interface.js";
export class MongoformRepository implements formRepository {
    async findAll(): Promise<Iform[]> {
        const form = await formModel.find();
        return form;
    }
    async findOne(id: any): Promise<Iform | null> {
        const form = await formModel.findById(id)
        return form;
    }
    async add(data: Partial<Iform>): Promise<Iform | null> {
        const form = new formModel(data);
        return await form.save();
    }
    async update(id: any, data: Partial<Iform>): Promise<Iform | null> {
        const form = await formModel.findOneAndUpdate({_id: id},data,{new: true})
        return form
    }
    async delete(id: any): Promise<Iform | null> {
        const form = await formModel.findOneAndDelete({_id: id});
        return form;
    }

} 