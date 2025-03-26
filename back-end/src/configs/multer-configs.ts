import { ForbiddenException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";


export const multerConfigs: MulterOptions = {
    storage: diskStorage({
        destination(req, file, callback) {
            const user: any = req.user
            if (!user.id) {
                throw new ForbiddenException("Need login to upload");
            }
            const destination = join(process.env.MULTER_DEST, "videos", user.id)
            if (!existsSync(destination)) {
                mkdirSync(destination, { recursive: true })
            }
            callback(null, destination);
        },
        filename(req, file, callback) {
            const user: any = req.user
            const extFile = extname(file.originalname);
            let fileName = `${user.id}-${Date.now()}-${Math.round(Math.random() * 1e9)}.${extFile}`;
            file.mimetype
            callback(null, fileName)
        },
    })
}

