import { Controller, FileTypeValidator, Get, NotFoundException, Param, ParseFilePipe, ParseIntPipe, Post, StreamableFile, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterImageProject } from 'src/configs/multer-configs-image-project';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { OwnerGuard } from 'src/auth/owner/owner.guard';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { createReadStream, existsSync, readFile } from 'fs';

@Controller('api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {

  }

  @Post('upload/project/:projectId')
  @UseGuards(JwtGuard, OwnerGuard, RoleGuard)
  @Roles('admin', 'member')
  @UseInterceptors(FilesInterceptor('files', 8, MulterImageProject))
  async uploadImagesProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.imageService.uploadImageProject(projectId, files);
  }

  @Get('/:id')
  async getImage(@Param('id') id: number) {
    const image = await this.imageService.getImageById(id);
    if (!existsSync(image.path)) {
      throw new NotFoundException('Not Found')
    }

    const file = createReadStream(image.path);
    return new StreamableFile(file);

  }
}
