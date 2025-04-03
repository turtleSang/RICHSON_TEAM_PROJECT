import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";


export const MulterConfigsVideoProject: MulterOptions = {
    storage: diskStorage({
        destination(req, file, callback) {
            const projectId = req.params.projectId;
            const user: any = req.user;
            if (!user.id && !projectId) {
                callback(new ForbiddenException, null);
            }
            const destination = join(process.env.MULTER_DEST, "videos", user.id, projectId);
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

