import { Controller, Delete, FileTypeValidator, Get, InternalServerErrorException, NotFoundException, Param, ParseFilePipe, ParseIntPipe, Post, StreamableFile, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterImageProject } from 'src/configs/multer-configs-image-project';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { OwnerGuard } from 'src/auth/owner/owner.guard';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { createReadStream, existsSync, readFile } from 'fs';
import { MulterThumbImage } from 'src/configs/multer-configs-thumb-project';

@Controller('api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

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

  @Post('upload/thumb-project/:projectId')
  @UseGuards(JwtGuard, OwnerGuard, RoleGuard)
  @Roles('admin', 'member')
  @UseInterceptors(FileInterceptor('file', MulterThumbImage))
  async uploadThumbProject(
    @Param('projectId') projectId: number,
    @UploadedFile('file', new ParseFilePipe({
      fileIsRequired: true,
    })) file: Express.Multer.File) {
    return await this.imageService.uploadThumbProject(projectId, file);
  }

  @Delete(':projectId/:imageId')
  @UseGuards(JwtGuard, OwnerGuard)
  async deleteImage(@Param('imageId') imageId: number, @Param('projectId') projectId: number) {
    return await this.imageService.deleteImage(imageId, projectId)
  }

  @Get('/:id')
  async getImage(@Param('id') id: number) {
    const image = await this.imageService.getImageById(id);
    if (!existsSync(image.path) || !image) {
      throw new NotFoundException('Not Found')
    }
    const fileStream = createReadStream(image.path);

    return new StreamableFile(fileStream);
  }
}
