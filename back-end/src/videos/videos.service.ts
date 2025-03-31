import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entity/videos-entity';
import { Repository } from 'typeorm';
import { ProjectEntity } from 'src/project/entity/project-entity';
import { existsSync } from "fs";
import * as fs from 'fs/promises';
import { VideoProjectEntity } from './entity/video-project-entity';

@Injectable()
export class VideosService {
    constructor(
        @InjectRepository(VideoEntity)
        private videosRepository: Repository<VideoEntity>,

        @InjectRepository(VideoProjectEntity)
        private videoProjectRepository: Repository<VideoProjectEntity>,

        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
    ) { }

    async createVideoProject(project: ProjectEntity, fileName: string, filePath: string) {
        const oldVideo = await this.videoProjectRepository
            .createQueryBuilder("projectVideo")
            .innerJoin("projectVideo.project", "project")
            .where('project.id = :projectId', { projectId: project.id })
            .getOne();

        if (oldVideo) {
            const oldPath = oldVideo.filePath;
            if (existsSync(oldPath)) {
                await fs.unlink(oldPath);
            }
            await this.videoProjectRepository.update({ id: oldVideo.id }, { fileName, filePath })
        } else {
            const newVideo = await this.videoProjectRepository.save({
                fileName,
                filePath,
                project
            })
            await this.projectRepository.update({ id: project.id }, { video: newVideo });
        }
        return `Videos of project ${project.name} was upload`;
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
        console.log(videoId);

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
        await fs.unlink(video.filePath);
        return 'delteted';
    }
}
