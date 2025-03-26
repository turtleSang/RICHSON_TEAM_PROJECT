import { BadRequestException, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { createReadStream, fstatSync, statSync } from 'fs';
import { join } from 'path';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { PassThrough } from 'stream';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { multerConfigs } from "src/configs/multer-configs";
import { OwnerGuard } from 'src/auth/owner/owner.guard';

@Controller('videos')
export class VideosController {


  @Get('/:id')
  async getFile(@Param('id') fileId: string, @Req() req: Request, @Res() res: Response) {
    const range = req.headers.range;
    if (!range) {
      throw new BadRequestException("Only Stream")
    }
    const path = join(process.cwd(), "demo", "0213.mp4")
    const stat = statSync(path);
    const fileSize = stat.size;

    const part = range.replace('bytes=', '').split('-');
    const start = parseInt(part[0]);
    const end = part[1] ? parseInt(part[1]) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      throw new BadRequestException("File size not accpeptRequested Range Not Satisfiable")
    }
    res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Type', 'video/mp4');

    const fileStream: ReadStream = createReadStream(path);

    fileStream.pipe(res, { end: true })
  }

  @Post('upload/:projectId')
  @UseGuards(JwtGuard, OwnerGuard, RoleGuard)
  @Roles('admin', 'member')
  @UseInterceptors(FileInterceptor('file', multerConfigs))
  async uploadVideos(@UploadedFile('file') file: Express.Multer.File, @Req() req: any) {
    console.log(req.project);

    return "hello";
  }


}
