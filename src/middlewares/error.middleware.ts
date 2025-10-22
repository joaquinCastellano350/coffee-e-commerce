import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { MongoServerError } from "mongodb";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Validation error", issues: err.message });
  }
  if (err.name === 'MongoServerError' && (err as MongoServerError).code === 11000) {
        return res.status(409).json({ message: 'Conflict error: Duplicate key' });
    }
  // ^^^ NO CAPTURA ESTE ERROR DE MONGODB DUPLICATE KEY ^^^

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: "Validation error" });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
};
