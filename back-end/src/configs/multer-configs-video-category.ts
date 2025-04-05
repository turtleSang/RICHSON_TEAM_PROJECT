import { BadRequestException } from "@nestjs/common";
import { MulterModuleOptions } from "@nestjs/platform-express";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";

export const MulterConfigsVideoCategory: MulterModuleOptions = {
    limits: { fileSize: 102400000 },
    fileFilter(req, file, callback) {
        const accept = file.mimetype === 'video/mp4';
        callback(!accept && new BadRequestException('require file mp4 and smaller 100MB'), accept);
    },
    storage: diskStorage({
        destination(req, file, callback) {
            const categoryId = req.params.categoryId;
            const destination = join(process.env.MULTER_DEST, 'videos', 'category', categoryId);
            if (!existsSync(destination)) {
                mkdirSync(destination, { recursive: true })
            }
            callback(null, destination)
        },
        filename(req, file, callback) {
            const categoryId = req.params.categoryId;
            const extFile = extname(file.originalname);
            let fileName = `Category-${categoryId}-${Date.now()}${extFile}`;

            callback(null, fileName)
        },
    })
}