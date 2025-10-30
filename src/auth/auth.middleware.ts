import {Request, Response, NextFunction} from 'express';
import { verifyAccess } from './token.util.js';
import { AppError } from '../utils/AppError.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.accessToken;
    if (!token) {
        throw new AppError('Authentication required', 401);
    }
    try {
        (req as any).user = verifyAccess(token);
        next();
    } catch {
        throw new AppError('Invalid token', 401);
        
    }
}

export function requireRole(...roles: Array<'admin' | 'user'>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user || !roles.includes(user.role)) {
            throw new AppError('Forbidden', 403);
        }
        next();
    };
}