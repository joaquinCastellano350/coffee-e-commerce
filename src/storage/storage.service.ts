import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { AppError } from "../utils/AppError.js";

export class StorageService {
    private uploadsDir = path.join(process.cwd(), 'uploads');

    async processImage(file: Express.Multer.File): Promise<string> {
        try {
            const src = path.join(this.uploadsDir, file.filename);
            const webpFilename = file.filename.replace(/\.\w+$/, '') + '.webp';
            const dest = path.join(this.uploadsDir, webpFilename);
            await sharp(src).resize(1280).webp({ quality: 80 }).toFile(dest);
            await fs.unlink(src);
            return `/uploads/${webpFilename}`;
        } catch (error) {
            throw new AppError('Failed to process image', 500);
        }
    }

    async deleteFile(imageUrl?: string): Promise<void> {
        if (!imageUrl || !imageUrl.startsWith('/uploads/')) return;

        const filePath = path.join(process.cwd(), imageUrl);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw new AppError('Failed to delete file', 500);
            }
    }

    }

}