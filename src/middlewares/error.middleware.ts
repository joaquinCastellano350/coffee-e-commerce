import {Request, Response, NextFunction} from 'express';
import { AppError } from '../utils/AppError.js';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({ message: 'Validation error', issues: err.message });
    }

    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
};
