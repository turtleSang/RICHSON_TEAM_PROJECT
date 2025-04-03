import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";

export const MulterImageProject: MulterOptions = {
    fileFilter(req, file, callback) {
        if (!(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
            callback(new BadRequestException('Only accept jpeg and png file'), false)
        }

        callback(null, true);
    },
    storage: diskStorage({
        destination(req, file, callback) {
            const projectId: any = req.params.projectId;
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
            const projectId: any = req.params.projectId;
            const ext = extname(file.originalname);
            const filename = `${projectId}-${Date.now()}-${Math.round(Math.random() * 1e3)}${ext}`
            callback(null, filename)
        },
    })
}