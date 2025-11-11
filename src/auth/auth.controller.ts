import {Request, Response, NextFunction} from 'express';
import crypto from 'node:crypto';
import { LoginDTO, RegisterDTO } from '../user/user.dto.js';
import { UserService } from '../user/user.service.js';
import { signAccess, signRefresh, verifyAccess, verifyRefresh } from './token.util.js';
import { AppError } from '../utils/AppError.js';

export class AuthController {
    
    private userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.refresh = this.refresh.bind(this);
        this.logout = this.logout.bind(this);
        this.changeRole = this.changeRole.bind(this);
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

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies?.refreshToken;
            if (!token) {
                throw new AppError('Unauthorized', 401);
            }
            const payload = verifyRefresh(token);
            const accessToken = signAccess({ id: payload.id, email: payload.email, role: payload.role });
            const newRefreshToken = signRefresh({ id: payload.id, email: payload.email, role: payload.role, jti: crypto.randomUUID() });
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.json({ email: payload.email, message: 'Token refreshed successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies?.accessToken;
            if (!token) {
                throw new AppError('Unauthorized', 401);
            }
            const payload = verifyAccess(token);
            res.status(200).json({ id: payload.id, email: payload.email, role: payload.role });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            // ANGULAR ? res.clearCookie('XSRF-TOKEN');
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async changeRole(req: Request, res: Response, next: NextFunction) {
        try {
            const { userEmail, role } = req.params;
            const updatedUser = await this.userService.changeUserRole(userEmail, role);
            res.json({ email: updatedUser.email, role: updatedUser.role });
        } catch (error) {
            next(error);
        }
    }
}