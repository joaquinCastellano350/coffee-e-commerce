import { MongoFormRepository } from "./form.repository.js";
import { AppError } from "../utils/AppError.js";
import { Mongoose, Schema } from "mongoose";
import { IForm } from "./form.model.js";
import { generateUniqueSlug } from "../utils/FormSlug.js";

const formRepository = new MongoFormRepository();

export class FormService {
    async getAllForms() {
        const forms = await formRepository.findAll();
        if (forms.length === 0) {
            throw new AppError("No forms found", 404);
        }
        return forms;
    }
    async getFormById(id: string) {
        const form = await formRepository.findOne(id);
        if (!form) {
            throw new AppError("Form not found", 404);
        }
        return form;
    }
    async createForm(data: Partial<IForm>) {
        data.slug = await generateUniqueSlug(data.name);
        const form = await formRepository.add(data);
        return form;
    }

    async updateForm(id: string, data: Partial<IForm>) {
        const updatedForm = await formRepository.update(id, data);
        if (!updatedForm) {
            throw new AppError("Form not found or could not be updated", 404);
        }
        return updatedForm;
    }

    async deleteForm(id: string) {
        const deletedForm = await formRepository.delete(id);
        if (!deletedForm) {
            throw new AppError("Form not found or could not be deleted", 404);
        }
        return deletedForm;
    }
}
