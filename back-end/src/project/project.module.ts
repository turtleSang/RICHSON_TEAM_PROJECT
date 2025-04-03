import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project-entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { CategoryEntity } from 'src/category/entity/category-entity';
import { VideoEntity } from 'src/videos/entity/videos-entity';
import { VideoProjectEntity } from 'src/videos/entity/video-project-entity';
import { ImageEntity } from 'src/image/entity/image-entity';
import { ImageProjectEntity } from 'src/image/entity/image-project-entity';
import { ThumbProjectEntity } from 'src/image/entity/image-project-thumb-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, UserEntity, CategoryEntity, VideoEntity, VideoProjectEntity, ImageEntity, ImageProjectEntity, ThumbProjectEntity])],
  controllers: [ProjectController],
  providers: [ProjectService, CategoryService, UserService],
})
export class ProjectModule { }
