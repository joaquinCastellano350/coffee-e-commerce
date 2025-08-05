import { MongoformRepository } from "./form.repository.js";
import { AppError } from "../utils/AppError.js";
import { Mongoose, Schema } from "mongoose";
import { Icontact } from "./form.model.js";

const formRepository = new MongoformRepository();

export class FormService {
    async getAllform() {
        const form = await formRepository.findAll();
        if (form.length === 0) {
            throw new AppError("No form found", 404);
        }
        return form;
    }
    async getformById(id: string) {
        const form = await formRepository.findOne(id);
        if (!form) {
            throw new AppError("Form not found", 404);
        }
        return form;
    }
    async createform(data: Partial<Icontact>) {
        const form = await formRepository.add(data);
        return form;
    }

    async updateform(id: string, data: Partial<Icontact>) {
        const updatedform = await formRepository.update(id, data);
        if (!updatedform) {
            throw new AppError("Form not found or could not be updated", 404);
        }
        return updatedform;
    }

    async deleteform(id: string) {
        const deletedform = await formRepository.delete(id);
        if (!deletedform) {
            throw new AppError("Form not found or could not be deleted", 404);
        }
        return deletedform;
    }
}
