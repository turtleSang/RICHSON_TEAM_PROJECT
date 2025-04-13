import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entity/image-entity';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { ImageProjectEntity } from './entity/image-project-entity';
import { ThumbProjectEntity } from './entity/image-project-thumb-entity';
import { FileDeleteEntity } from 'src/delete-file/entity/file-delete-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ImageEntity, ImageProjectEntity, ThumbProjectEntity, FileDeleteEntity])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule { }
