import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';

import { VideosService } from './videos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { VideosEntity } from './entity/videos-entity';



@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, VideosEntity])],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule { }
