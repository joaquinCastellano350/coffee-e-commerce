import {Request, Response, NextFunction} from 'express';
import crypto from 'node:crypto';
import { LoginDTO, RegisterDTO } from '../user/user.dto.js';
import { UserService } from '../user/user.service.js';
import { MongoUserRepository } from '../user/user.repository.js';
import { signAccess, signRefresh } from './token.util';
import { AppError } from '../utils/AppError.js';

export class AuthController {
    private userService: UserService;
    constructor(userService?: UserService) {
        this.userService = userService || new UserService(new MongoUserRepository());
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: RegisterDTO = req.body;
            const newUser = await this.userService.register(userData);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }

    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginData: LoginDTO = req.body;
            const user = await this.userService.login(loginData);
            if (!user) {
                throw new AppError('Invalid credentials', 401);
            }
            const accessToken = signAccess({ id: user.id, email: user.email, role: user.role });
            const refreshToken = signRefresh({ id: user.id, email: user.email, role: user.role, jti: crypto.randomUUID() });
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 15 * 60 * 1000 });

            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

            // ANGULAR ? res.cookie('XSRF-TOKEN', 'placeholder', {sameSite: 'lax'});

            res.json({ email: user.email, message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    }
}