import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';

import { VideosService } from './videos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { VideoEntity } from './entity/videos-entity';
import { VideoProjectEntity } from './entity/video-project-entity';
import { VideoBackgroundEntity } from './entity/videos-background-entity';
import { CategoryEntity } from 'src/category/entity/category-entity';
import { FileDeleteEntity } from 'src/delete-file/entity/file-delete-entity';



@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, VideoEntity, VideoProjectEntity, VideoBackgroundEntity, CategoryEntity, FileDeleteEntity])],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule { }
