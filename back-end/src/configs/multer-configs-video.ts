import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";


export const MulterConfigsVideo: MulterOptions = {
    // fileFilter: (req, file, callback) => {
    //     if (file.mimetype != "video/mp4") {
    //         callback(new BadRequestException("Only accept mp4 file"), false)
    //     }
    //     callback(null, true);
    // },
    storage: diskStorage({
        destination(req, file, callback) {
            const user: any = req.user;
            if (!user.id) {
                callback(new ForbiddenException, null);
            }
            const destination = join(process.env.MULTER_DEST_VIDEO, "videos", user.id);
            if (!existsSync(destination)) {
                mkdirSync(destination, { recursive: true })
            }
            callback(null, destination);
        },
        filename(req, file, callback) {
            const user: any = req.user
            const extFile = extname(file.originalname);
            let fileName = `${user.id}-${Date.now()}-${Math.round(Math.random() * 1e9)}${extFile}`;

            callback(null, fileName)
        },
    })
}

