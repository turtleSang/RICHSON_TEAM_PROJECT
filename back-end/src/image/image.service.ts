import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ImageProjectEntity } from './entity/image-project-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { unlink, access } from 'fs/promises'
import { existsSync } from 'fs';
import { ImageEntity } from './entity/image-entity';
import { ThumbProjectEntity } from './entity/image-project-thumb-entity';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageProjectEntity)
        private imageProjectRepository: Repository<ImageProjectEntity>,

        @InjectRepository(ThumbProjectEntity)
        private thumbRepository: Repository<ThumbProjectEntity>,

        @InjectRepository(ImageEntity)
        private imageRepository: Repository<ImageEntity>,

        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,


    ) { }

    async uploadImageProject(projectId: number, listFile: Express.Multer.File[]) {
        const project = await this.projectRepository.findOne(
            {
                where: { id: projectId },
                relations: { imageList: true }
            }
        )
        if (!project) {
            for (const file of listFile) {
                if (existsSync(file.path)) {
                    await unlink(file.path)
                }
            }
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
            for (const image of oldImages) {
                if (existsSync(image.path)) {
                    await unlink(image.path)
                }
            }
            throw new InternalServerErrorException('Can not upload')
        }
    }

    async uploadThumbProject(projectId: number, file: Express.Multer.File) {
        const project = await this.projectRepository.findOne(
            {
                where: { id: projectId }, relations: { thumb: true }
            }
        )
        if (!project) {
            return new NotFoundException('Not Found Project');
        }
        const oldThumb = project.thumb;
        try {
            if (oldThumb) {
                await this.thumbRepository.update({ id: oldThumb.id }, { path: file.path });
                existsSync(oldThumb.path) && await unlink(oldThumb.path);
            } else {
                const newThumb = this.thumbRepository.create({
                    path: file.path,
                    project
                });
                const savedThumb = await this.thumbRepository.save(newThumb);
                await this.projectRepository.update({ id: projectId }, { thumb: savedThumb })
            }
            return `Thumbnail project ${project.name} was upload`;
        } catch (error) {
            throw new InternalServerErrorException('Server Error')
        }
    }

    async getImageById(imageId: number) {
        try {
            return await this.imageRepository.findOneByOrFail({ id: imageId })

        } catch (error) {
            throw new NotFoundException('Not found image')
        }

    }

    async deleteImage(imageId: number, projectId: number) {
        const image = await this.imageRepository.findOneBy({ id: imageId });
        if (!image) {
            throw new NotFoundException('Not found Image')
        }
        try {
            if (image instanceof ThumbProjectEntity) {
                await this.projectRepository.update({ id: projectId }, { thumb: null });
                await this.thumbRepository.remove(image);
            } if (image instanceof ImageProjectEntity) {
                await this.imageProjectRepository.remove(image)
            } else {
                await this.imageRepository.remove(image);
            }
            await unlink(image.path);
            return 'Image was delete';
        } catch (error) {
            throw new InternalServerErrorException("Server Errors")
        }

    }
}
