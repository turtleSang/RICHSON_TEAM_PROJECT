import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";


export const MulterConfigsVideoProject: MulterOptions = {
    fileFilter(req, file, callback) {
        const accept = file.mimetype === 'video/mp4'
        callback(!accept && new BadRequestException('require file mp4'), accept);
    },
    storage: diskStorage({
        destination(req, file, callback) {
            const id = req.params.id;
            const user: any = req.user;
            if (!user.id && !id) {
                callback(new ForbiddenException, null);
            }
            const destination = join(process.env.MULTER_DEST, "videos", 'project', id);
            if (!existsSync(destination)) {
                mkdirSync(destination, { recursive: true })
            }
            callback(null, destination);
        },
        filename(req, file, callback) {
            const user: any = req.user
            const extFile = extname(file.originalname);
            let fileName = `${user.id}-${Date.now()}-${Math.round(Math.random() * 1e3)}${extFile}`;

            callback(null, fileName)
        },
    })
}

