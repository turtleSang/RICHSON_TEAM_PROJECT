import { Module } from '@nestjs/common';
import { DeleteFileService } from './delete-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileDeleteEntity } from './entity/file-delete-entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileDeleteEntity])],
  providers: [DeleteFileService]
})
export class DeleteFileModule { }
