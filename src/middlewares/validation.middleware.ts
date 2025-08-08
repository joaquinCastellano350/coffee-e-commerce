import {Request, Response, NextFunction} from 'express';
import { ZodObject} from 'zod';
import { AppError } from '../utils/AppError.js';

export const validate =
(schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        next(error);
        
    }
};