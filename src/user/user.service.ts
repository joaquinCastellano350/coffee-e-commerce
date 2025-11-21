import type { MongoUserRepository } from "./user.repository.js";
import type { LoginDTO, RegisterDTO, UserResponseDTO } from "./user.dto.js";
import { AppError } from "../utils/AppError.js";

export class UserService {
  private readonly repo: MongoUserRepository;
  constructor(repo: MongoUserRepository) {
    this.repo = repo;
  }

  async getAll(email?: string, role?: "admin" | "user") {
    const filters: Record<string, unknown> = {};
    if (email) {
      const regex = new RegExp(email, "i");
      filters.email = { $regex: regex };
    }
    if (role) {
      filters.role = role;
    }
    return await this.repo.findAll(filters);
  }

  async register(dto: RegisterDTO): Promise<UserResponseDTO> {
    const existing = await this.repo.findByEmail(dto.email);
    if (existing) throw new AppError("Email already in use", 409);

    const user = await this.repo.add({
      email: dto.email,
      role: "user",
      passwordHash: "pending",
    });

    await user.setPassword(dto.password);
    await user.save();

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt?.toISOString(),
    };
  }

  async login(dto: LoginDTO): Promise<UserResponseDTO | null> {
    const user = await this.repo.findByEmail(dto.email);
    if (!user) return null;
    const valid = await user.validatePassword(dto.password);
    if (!valid) return null;
    return this.toDTO(user);
  }

  async changeUserRole(
    userEmail: string,
    role: string
  ): Promise<UserResponseDTO> {
    if (!["user", "admin"].includes(role)) {
      throw new AppError("Invalid role specified", 400);
    }

    const user = await this.repo.findByEmail(userEmail);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    user.role = role as "admin" | "user";
    await user.save();
    return this.toDTO(user);
  }

  async getWishlists() {
    const total = this.repo.countWishlsits();
    return total;
  }
  async mostWishedProducts() {
    const products = await this.repo.mostWishedProducts();
    if (products.length == 0) {
      throw new AppError("No wished products", 404);
    }
    return products;
  }
  toDTO(user: any): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt?.toISOString(),
    };
  }
}
