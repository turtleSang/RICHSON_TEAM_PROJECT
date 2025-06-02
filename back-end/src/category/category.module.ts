import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category-entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { VideoBackgroundEntity } from 'src/videos/entity/videos-background-entity';
import { FileDeleteEntity } from 'src/delete-file/entity/file-delete-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, UserEntity, VideoBackgroundEntity, FileDeleteEntity])],
  controllers: [CategoryController],
  providers: [CategoryService, UserService],
})
export class CategoryModule { }
