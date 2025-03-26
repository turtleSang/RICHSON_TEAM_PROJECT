import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GolbalConfigsModule } from './configs/golbal-configs.module';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

import { VideosModule } from './videos/videos.module';
import { ProjectModule } from './project/project.module';


@Module({
  imports: [GolbalConfigsModule, AuthModule, DatabaseModule, UserModule, CategoryModule, VideosModule, ProjectModule],
  providers: [UserService],
})
export class AppModule { }
