import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileDeleteEntity } from './entity/file-delete-entity';
import { Interval } from '@nestjs/schedule';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class DeleteFileService {
    private readonly logger = new Logger(DeleteFileService.name, { timestamp: true });
    constructor(
        @InjectRepository(FileDeleteEntity)
        private deleteFileRepository: Repository<FileDeleteEntity>
    ) { }

    @Interval(60000)
    async deleteFile() {
        let listFileDelete: FileDeleteEntity[] = await this.deleteFileRepository.find();

        if (listFileDelete.length === 0) {
            return;
        }

        for (const file of listFileDelete) {
            try {
                if (existsSync(file.path)) {
                    await unlink(file.path);
                    await this.deleteFileRepository.remove(file)
                    this.logger.log(`Delete File ${file.id} ${file.path}`)
                }
            } catch (error) {
                this.logger.log(`Can not try later File ${file.id} ${file.path}`)

            }
        }

    }
}
