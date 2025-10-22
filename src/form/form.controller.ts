import { NextFunction, Request, Response } from "express";
import { FormService } from "./form.service.js";

export class FormController {
  private formService: FormService;

  constructor(formService: FormService) {
    this.formService = formService;
    this.createForm = this.createForm.bind(this);
    this.deleteForm = this.deleteForm.bind(this);
    this.getAllForms = this.getAllForms.bind(this);
    this.getFormById = this.getFormById.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  async getAllForms(req: Request, res: Response, next: NextFunction) {
    try {
      const forms = await this.formService.getAllForms();
      res.status(200).json(forms);
    } catch (error) {
      next(error);
    }
  }

  async getFormById(req: Request, res: Response, next: NextFunction) {
    try {
      const form = await this.formService.getFormById(req.params.id);
      res.status(200).json(form);
    } catch (error) {
      next(error);
    }
  }

  async createForm(req: Request, res: Response, next: NextFunction) {
    try {
      const createdForm = await this.formService.createForm(req.body);
      res.status(201).json(createdForm);
    } catch (error) {
      next(error);
    }
  }

  async updateForm(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedForm = await this.formService.updateForm(
        req.params.id,
        req.body,
      );
      res.status(200).json(updatedForm);
    } catch (error) {
      next(error);
    }
  }

  async deleteForm(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedForm = await this.formService.deleteForm(req.params.id);
      res.status(204).json(deletedForm);
    } catch (error) {
      next(error);
    }
  }
}
