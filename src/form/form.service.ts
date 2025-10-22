import { MongoFormRepository } from "./form.repository.js";
import { AppError } from "../utils/AppError.js";
import { IForm } from "./form.model.js";
import { generateUniqueSlug } from "../utils/FormSlug.js";

export class FormService {
  private formRepository: MongoFormRepository;

  constructor(formRepository: MongoFormRepository) {
    this.formRepository = formRepository;
  }

  async getAllForms() {
    const forms = await this.formRepository.findAll();
    if (forms.length === 0) {
      throw new AppError("No forms found", 404);
    }
    return forms;
  }
  async getFormById(id: string) {
    const form = await this.formRepository.findOne(id);
    if (!form) {
      throw new AppError("Form not found", 404);
    }
    return form;
  }
  async createForm(data: Partial<IForm>) {
    data.slug = await generateUniqueSlug(String(data.name));
    const form = await this.formRepository.add(data);
    return form;
  }

  async updateForm(id: string, data: Partial<IForm>) {
    const updatedForm = await this.formRepository.update(id, data);
    if (!updatedForm) {
      throw new AppError("Form not found or could not be updated", 404);
    }
    return updatedForm;
  }

  async deleteForm(id: string) {
    const deletedForm = await this.formRepository.delete(id);
    if (!deletedForm) {
      throw new AppError("Form not found or could not be deleted", 404);
    }
    return deletedForm;
  }
}
