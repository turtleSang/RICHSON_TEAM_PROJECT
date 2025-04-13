import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entity/videos-entity';
import { Repository } from 'typeorm';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { existsSync } from "fs";
import * as fs from 'fs/promises';
import { VideoProjectEntity } from './entity/video-project-entity';
import { CategoryEntity } from 'src/category/entity/category-entity';
import { VideoBackgroundEntity } from './entity/videos-background-entity';
import { FileDeleteEntity } from 'src/delete-file/entity/file-delete-entity';

@Injectable()
export class VideosService {
    constructor(
        @InjectRepository(VideoEntity)
        private videosRepository: Repository<VideoEntity>,

        @InjectRepository(VideoProjectEntity)
        private videoProjectRepository: Repository<VideoProjectEntity>,

        @InjectRepository(VideoBackgroundEntity)
        private videoBackgroundRepository: Repository<VideoBackgroundEntity>,

        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,

        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>,

        @InjectRepository(FileDeleteEntity)
        private deleteFileRepository: Repository<FileDeleteEntity>,

    ) { }

    async createVideoProject(project: ProjectEntity, fileName: string, filePath: string) {
        const oldVideo = await this.videoProjectRepository
            .createQueryBuilder("projectVideo")
            .innerJoin("projectVideo.project", "project")
            .where('project.id = :projectId', { projectId: project.id })
            .getOne();

        if (oldVideo) {
            try {
                const oldPath = oldVideo.filePath;
                await this.deleteFileRepository.save({ path: oldPath });
                await this.videoProjectRepository.update({ id: oldVideo.id }, { fileName, filePath })
            } catch (error) {
                throw new InternalServerErrorException('Can not delete Old Videos')
            }
        } else {
            try {
                const newVideo = await this.videoProjectRepository.save({
                    fileName,
                    filePath,
                    project
                })
                await this.projectRepository.update({ id: project.id }, { video: newVideo });
            } catch (error) {
                throw new InternalServerErrorException('Can not upload videos');
            }

        }
        return `Videos of project ${project.name} was upload`;
    }

    async createVideoCategory(categoryId: number, fileName: string, filePath: string) {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
            relations: {
                videoThumb: true
            }
        })
        if (!category) {
            await this.deleteFileRepository.save({ path: filePath })
            throw new NotFoundException("Can't found Category");
        }
        const oldThumb = category.videoThumb;
        if (oldThumb) {
            try {
                await this.deleteFileRepository.save({ path: oldThumb.filePath });
                await this.videoBackgroundRepository.update({ id: oldThumb.id }, { fileName, filePath })
            } catch (error) {
                await this.deleteFileRepository.save({ path: filePath });
                throw new InternalServerErrorException('Can not delete old Thumbnail')
            }
        } else {
            const newThumb = await this.videoBackgroundRepository.save({
                category,
                fileName,
                filePath
            })
            await this.categoryRepository.update({ id: categoryId }, { videoThumb: newThumb });
        }

        return `Updated thumb for Category ${category.name}`
    }

    async getOneById(videoId: number) {
        try {
            return await this.videosRepository.findOneByOrFail({ id: videoId });
        } catch (error) {
            throw new NotFoundException("Can not find video")
        }
    }

    async getOneByProject(projectId: number): Promise<VideoEntity> {
        return await this.videosRepository.createQueryBuilder("video")
            .select()
            .leftJoin("video.project", "project")
            .where("project.id = :id", { id: projectId })
            .getOne();
    }

    async deleteVideoProject(videoId: number) {
        const video = await this.videoProjectRepository
            .createQueryBuilder('video')
            .select()
            .where('video.id = :id', { id: videoId })
            .leftJoin('video.project', 'project')
            .addSelect('project.id')
            .getOne()
        if (!video) {
            throw new NotFoundException("Can not found Video")
        }
        await this.projectRepository.update({ id: video.project.id }, { video: null });
        await this.videosRepository.delete({ id: videoId })
        await this.deleteFileRepository.save({ path: video.filePath });
        return 'delteted';
    }

    async deleteVideoCategory(videoId: number) {
        const video = await this.videoBackgroundRepository
            .createQueryBuilder('video')
            .select()
            .where('video.id = :id', { id: videoId })
            .leftJoin('video.category', 'category')
            .addSelect('category.id')
            .getOne()
        if (!video) {
            throw new NotFoundException("Can not found Video")
        }
        await this.categoryRepository.update({ id: video.category.id }, { videoThumb: null });
        await this.videosRepository.delete({ id: videoId })
        await this.deleteFileRepository.save({ path: video.filePath });
        return 'delteted';
    }

}
