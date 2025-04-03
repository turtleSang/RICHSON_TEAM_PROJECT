import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ImageProjectEntity } from './entity/image-project-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { unlink, access } from 'fs/promises'
import { existsSync } from 'fs';
import { ImageEntity } from './entity/image-entity';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageProjectEntity)
        private imageProjectRepository: Repository<ImageProjectEntity>,

        @InjectRepository(ImageEntity)
        private imageRepositoru: Repository<ImageEntity>,

        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,

        private dataSource: DataSource,


    ) { }

    async uploadImageProject(projectId: number, listFile: Express.Multer.File[]) {
        const project = await this.projectRepository.findOne(
            {
                where: { id: projectId },
                relations: { imageList: true }
            }
        )

        if (!project) {
            await Promise.all(listFile.map(async (file) => {
                try {
                    await unlink(file.path);
                    await unlink(file.path)
                    return
                } catch (error) {
                    return;
                }
            }));
            throw new NotFoundException('Can not found project');
        }
        const oldImages = project.imageList;

        if (oldImages.length > 0) {
            for (const image of oldImages) {
                if (existsSync(image.path)) {
                    await unlink(image.path)
                }
            }
            await this.imageProjectRepository.remove(oldImages);
        }


        try {
            const listFileSave: ImageProjectEntity[] = listFile.map((file) => {
                const fileEntity = this.imageProjectRepository.create({
                    path: file.path,
                    project
                });
                return fileEntity;
            })

            await this.imageProjectRepository.save(listFileSave);
            return `Update Images for project ${project.name}`
        } catch (error) {
            await Promise.all(listFile.map(async (file) => {
                try {
                    await access(file.path);
                    await unlink(file.path)
                    return
                } catch (error) {
                    return;
                }
            }));
            throw new InternalServerErrorException('Can not upload')
        }
    }

    async getImageById(imageId: number) {

        return await this.imageRepositoru.findOneByOrFail({ id: imageId })

    }
}
