import {NextFunction, Request, Response} from 'express';
import {FormService} from './form.service.js';


const formService = new FormService();

export class FormController {
    async getAllForms(req: Request, res: Response, next: NextFunction) {
        try {
            const forms = await formService.getAllForms();
            res.status(200).json(forms);
        } catch (error) {
            next(error);
        }
    }

    async getFormById(req: Request, res: Response, next: NextFunction) {
        try {
            const form = await formService.getFormById(req.params.id);
            res.status(200).json(form);
        } catch (error) {
            next(error);
        }
    }

    async createForm(req: Request, res: Response, next: NextFunction) {
        try {
            const createdform = await formService.createForm(req.body);
            res.status(201).json(createdform);
        } catch (error) {
            next(error);
        }
    }
    

    async updateForm(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedForm = await formService.updateForm(req.params.id, req.body);
            res.status(200).json(updatedForm);
        } catch (error) {
            next(error);
        }
    }

    async deleteForm(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedForm = await formService.deleteForm(req.params.id);
            res.status(204).json(deletedForm);
        } catch (error) {
            next(error);
        }
    }

    
}
