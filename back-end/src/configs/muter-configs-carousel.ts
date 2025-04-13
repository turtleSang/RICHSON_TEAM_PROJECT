import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync, unlink } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { unlinkSync } from 'fs'

export const MulterCarousel: MulterOptions = {
    fileFilter(req, file, callback) {
        const accept = file.mimetype === 'video/mp4';
        callback(!accept && new BadRequestException('require file mp4 and smaller 100MB'), accept);

    },
    limits: { fileSize: 1024 * 1024 * 500 },
    storage: diskStorage({
        destination(req, file, callback) {
            const destination = join(process.env.MULTER_DEST, 'videos', 'carousel')
            if (!existsSync(destination)) {
                mkdirSync(destination, { recursive: true })
            }
            callback(null, destination)
        },
        filename(req, file, callback) {
            const ext = extname(file.originalname);
            const filename = `carousel${ext}`;

            callback(null, filename);
        },
    })
}