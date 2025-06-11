import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";

export const MulterImageProject: MulterOptions = {
    fileFilter(req, file, callback) {
        const accept = file.mimetype === 'image/png' || file.mimetype === 'image/jpeg';
        callback(!accept && new BadRequestException('require file png and jpeg'), accept);
    },
    storage: diskStorage({
        destination(req, file, callback) {
            const projectId: any = req.params.id;
            if (!projectId) {
                callback(new BadRequestException('Need category Id'), null)

            }
            const destination = join(process.env.MULTER_DEST, 'images', 'project', projectId)
            if (!existsSync(destination)) {
                mkdirSync(destination, { recursive: true })
            }
            callback(null, destination)
        },
        filename(req, file, callback) {
            const projectId: any = req.params.id;
            const ext = extname(file.originalname);
            const filename = `${projectId}-${Date.now()}-${Math.round(Math.random() * 1e3)}${ext}`
            callback(null, filename)
        },
    })
}