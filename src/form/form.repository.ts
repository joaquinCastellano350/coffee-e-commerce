import {Icontact, formModel} from "./form.model.js"
import { formRepository } from "./form.repository.interface.js";
export class MongoformRepository implements formRepository {
    async findAll(): Promise<Icontact[]> {
        const form = await formModel.find();
        return form;
    }
    async findOne(id: any): Promise<Icontact | null> {
        const form = await formModel.findById(id)
        return form;
    }
    async add(data: Partial<Icontact>): Promise<Icontact | null> {
        const form = new formModel(data);
        return await form.save();
    }
    async update(id: any, data: Partial<Icontact>): Promise<Icontact | null> {
        const form = await formModel.findOneAndUpdate({_id: id},data,{new: true})
        return form
    }
    async delete(id: any): Promise<Icontact | null> {
        const form = await formModel.findOneAndDelete({_id: id});
        return form;
    }

} 