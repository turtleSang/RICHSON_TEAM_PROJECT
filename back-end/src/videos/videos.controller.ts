import {
  BadRequestException,
  Controller,
  Delete,
  FileTypeValidator,
  FileValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,

} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { createReadStream, existsSync, fstatSync, statSync } from 'fs';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { MulterConfigsVideoProject } from "src/configs/multer-configs-video-project";
import { OwnerGuard } from 'src/auth/owner/owner.guard';
import { VideosService } from './videos.service';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { MulterConfigsVideoCategory } from 'src/configs/multer-configs-video-category';
import { MulterCarousel } from 'src/configs/muter-configs-carousel';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('api/video')
export class VideosController {
  constructor(private videosService: VideosService, private configService: ConfigService) { }

  @Get('/stream/:id')
  async streamVideos(@Param('id', ParseIntPipe) videoId: number, @Req() req: Request, @Res() res: Response) {
    const range = req.headers.range;
    if (!range) {
      throw new BadRequestException("Only Stream");
    }
    // Get File Info
    const video = await this.videosService.getOneById(videoId);
    const slat = statSync(video.filePath);
    const fileSize = slat.size;

    // Get Part
    const part = range.replace("bytes=", '').split('-')
    const start = parseInt(part[0])
    const end = part[1] ? parseInt(part[1]) : fileSize - 1
    const chunkSize = end - start + 1;
    if (start >= fileSize || end >= fileSize) {
      throw new BadRequestException("File size not accpeptRequested Range Not Satisfiable")
    }
    const fileStream: ReadStream = createReadStream(video.filePath, { start, end });

    // Stream
    res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', chunkSize);
    res.setHeader('Access-Control-Allow-Origin', this.configService.get('FRONT_END_URL'));
    res.status(206)
    fileStream.pipe(res);
  }


  @Get('/carousel')
  async getCarousel(@Res() res: any, @Req() req: any) {
    const path = join(process.env.MULTER_DEST, 'videos/carousel/carousel.mp4');

    if (!existsSync(path)) {
      return res.status(404).send('File not found');
    }

    const stat = statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Parse range
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = createReadStream(path, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': this.configService.get('FRONT_END_URL'),
      });

      file.pipe(res);
    } else {
      // Fallback if no Range header
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': this.configService.get('FRONT_END_URL'),
      });

      createReadStream(path).pipe(res);
    }
  }

  @Post('upload/project/:id')
  @UseGuards(JwtGuard, OwnerGuard, RoleGuard)
  @Roles('admin', 'member')
  @UseInterceptors(
    FileInterceptor('file', MulterConfigsVideoProject)
  )
  async uploadVideoProject(
    @Req() req: any,
    @UploadedFile('file') file: Express.Multer.File
  ) {
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
        new MaxFileSizeValidator({ maxSize: 102400000 })
      ]
    })) file: Express.Multer.File
  ) {
    return await this.videosService.createVideoCategory(categoryId, file.filename, file.path)
  }

  @Post('upload/carousel')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file', MulterCarousel))
  async uploadCarousel(@UploadedFile('file') file: Express.Multer.File) {
    return 'Uploaded Carousel';
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
