import type { MongoUserRepository } from './user.repository.js';
import type { LoginDTO, RegisterDTO, UserResponseDTO } from './user.dto.js';
import { AppError } from '../utils/AppError.js';

export class UserService {
  constructor(private readonly repo: MongoUserRepository) {}

  async register(dto: RegisterDTO): Promise<UserResponseDTO> {
    const existing = await this.repo.findByEmail(dto.email);
    if (existing) throw new AppError('Email already in use', 409);

    const user = await this.repo.add({
      email: dto.email,
      role: dto.role ?? 'user',
      passwordHash: 'pending'
    });

    await user.setPassword(dto.password);
    await user.save();

    return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt?.toISOString() };
  }


  async login(dto: LoginDTO): Promise<UserResponseDTO | null> {
    const user = await this.repo.findByEmail(dto.email);
    if (!user) return null;
    const valid = await user.validatePassword(dto.password);
    if (!valid) return null;
    return this.toDTO(user);
  }

  toDTO(user: any): UserResponseDTO {
    return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt?.toISOString() };
  }
}
