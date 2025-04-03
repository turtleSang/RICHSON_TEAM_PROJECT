import {
  BadRequestException,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,

} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { createReadStream, fstatSync, statSync } from 'fs';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { MulterConfigsVideoProject } from "src/configs/multer-configs-video-project";
import { OwnerGuard } from 'src/auth/owner/owner.guard';
import { VideosService } from './videos.service';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { MulterConfigsVideoCategory } from 'src/configs/multer-configs-video-category';

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
  @UseInterceptors(
    FileInterceptor('file', MulterConfigsVideoProject)
  )
  async uploadVideoProject(
    @Req() req: any,
    @UploadedFile('file', new ParseFilePipe({
      fileIsRequired: true,
      validators: [
        new FileTypeValidator({ fileType: 'video/mp4' }),
      ]
    })) file: Express.Multer.File
  ) {
    console.log(file.size);

    const project: ProjectEntity = req.project as ProjectEntity;
    return await this.videosService.createVideoProject(project, file.filename, file.path);
  }

  @Post('upload/category/:categoryId')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('file', MulterConfigsVideoCategory)
  )
  async uploadVideoCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @UploadedFile('file', new ParseFilePipe({
      fileIsRequired: true,
      validators: [
        new FileTypeValidator({ fileType: 'video/mp4' }),
        new MaxFileSizeValidator({ maxSize: 102400000 })
      ]
    })) file: Express.Multer.File
  ) {
    return await this.videosService.createVideoCategory(categoryId, file.filename, file.path)
  }


  @Delete('project/:id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  async deleteVideoProject(@Param('id', ParseIntPipe) videoid: number) {
    return this.videosService.deleteVideoProject(videoid)
  }

  @Delete('category/:id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  async deleteVideoCategory(@Param('id', ParseIntPipe) videoid: number) {
    this.videosService.deleteVideoCategory(videoid)
  }


}
