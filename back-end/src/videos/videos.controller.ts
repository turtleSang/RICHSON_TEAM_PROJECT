import { BadRequestException, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { createReadStream, fstatSync, statSync } from 'fs';
import { join } from 'path';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { PassThrough } from 'stream';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { MulterConfigsVideo } from "src/configs/multer-configs-video";
import { OwnerGuard } from 'src/auth/owner/owner.guard';
import { VideosService } from './videos.service';
import { ProjectEntity } from 'src/project/entity/project-entity';

@Controller('api/video')
export class VideosController {
  constructor(private videosService: VideosService) { }

  @Get('/stream/:id')
  async streamVideos(@Param('id', ParseIntPipe) videoId: number, @Req() req: Request, @Res() res: Response) {
    const range = req.headers.range;
    if (!range) {
      throw new BadRequestException("Only Stream");
    }
    const video = await this.videosService.getOneById(videoId);
    console.log(video);

    const slat = statSync(video.filePath);
    const fileSize = slat.size;
    const part = range.replace("byte=", '').split('-')
    const start = parseInt(part[1])
    const end = part[2] ? parseInt(part[2]) : fileSize - 1
    const chunkSize = end - start + 1;
    if (start >= fileSize || end >= fileSize) {
      throw new BadRequestException("File size not accpeptRequested Range Not Satisfiable")
    }
    res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', chunkSize);
    const fileStream: ReadStream = createReadStream(video.filePath);
    fileStream.pipe(res);
  }

  @Post('upload/project/:projectId')
  @UseGuards(JwtGuard, OwnerGuard, RoleGuard)
  @Roles('admin', 'member')
  @UseInterceptors(FileInterceptor('file', MulterConfigsVideo))
  async uploadVideos(@Req() req: any, @UploadedFile('file') file: Express.Multer.File) {
    const project: ProjectEntity = req.project as ProjectEntity;
    return await this.videosService.createVideoProject(project, file.filename, file.path)
  }
  @Delete('project/:id')
  async deleteVideo(@Param('id', ParseIntPipe) videoid: number) {
    return this.videosService.deleteVideoProject(videoid)
  }

}
