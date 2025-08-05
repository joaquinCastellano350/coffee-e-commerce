import {NextFunction, Request, Response} from 'express';
import {FormService} from './form.service.js';
import { createformSchema, updateformSchema } from './form.validation.js';

const formService = new FormService();

export class FormController {
    async getAllform(req: Request, res: Response, next: NextFunction) {
        try {
            const form = await formService.getAllform();
            res.status(200).json(form);
        } catch (error) {
            next(error);
        }
    }

    async getformById(req: Request, res: Response, next: NextFunction) {
        try {
            const form = await formService.getformById(req.params.id);
            res.status(200).json(form);
        } catch (error) {
            next(error);
        }
    }

    async createform(req: Request, res: Response, next: NextFunction) {
        try {
            const form = createformSchema.parse(req.body);
            const createdform = await formService.createform(form);
            res.status(201).json(createdform);
        } catch (error) {
            next(error);
        }
    }

    async updateform(req: Request, res: Response, next: NextFunction) {
        try {
            const form = updateformSchema.parse(req.body);
            const updatedform = await formService.updateform(req.params.id, form);
            res.status(200).json(updatedform);
        } catch (error) {
            next(error);
        }
    }

    async deleteform(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedform = await formService.deleteform(req.params.id);
            res.status(204).json(deletedform);
        } catch (error) {
            next(error);
        }
    }
}