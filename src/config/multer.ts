import multer from 'multer';
import {randomUUID} from 'node:crypto';
import path from 'node:path';
import { StorageService } from '../storage/storage.service.js';

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, StorageService.uploadsDir),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${randomUUID()}${ext || '.bin'}`);
    },
});

export const upload = multer(
    {storage,
        limits: {fileSize: 5 * 1024 * 1024}, // 5 MB
        fileFilter: (_req, file, cb) => {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.'));
            }
        }
    }
)