import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project-entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { ProjectCreateDto } from './dto/project-create-dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { CategoryEntity } from 'src/category/entity/category-entity';

import { unlink } from "fs/promises"
import { existsSync } from 'fs';
import { ProjectUpdateDto } from './dto/project-update-dto';
import { ProjectShort } from './dto/short-condition-dto';
import { FileDeleteEntity } from 'src/delete-file/entity/file-delete-entity';
import { UpdateRatingDto } from './dto/update-rating-dto';
@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity) private projectRepository: Repository<ProjectEntity>,
        @InjectRepository(FileDeleteEntity) private deleteFileRepository: Repository<FileDeleteEntity>,
        private categoryService: CategoryService,
        private userService: UserService
    ) { }

    async createProject(projectDto: ProjectCreateDto, authorId: number) {
        const author: UserEntity = await this.userService.findOneById(authorId);
        if (!author) {
            throw new BadRequestException('Not found author');
        }
        const listCategory: CategoryEntity[] = await Promise.all(projectDto.categoryIdList.map(async (id) => {
            const category = await this.categoryService.getOneById(id);
            if (!category) {
                throw new NotFoundException("Not Found Category")
            }
            return category;
        }))
        if (listCategory.length === 0) {
            throw new NotFoundException("Not found category");
        }

        try {
            const project = await this.projectRepository.save({
                author,
                categoryList: listCategory,
                description: projectDto.description.trim(),
                name: projectDto.name.trim(),
            })
            return { id: project.id, name: project.name };
        } catch (error) {
            throw new BadRequestException('Server error', error)
        }
    }

    async getListProject(pageNumber: number, pageSize: number, type: ProjectShort, short: boolean
    ) {
        const skip: number = (pageNumber - 1) * pageSize;
        const shortCondition = short ? "DESC" : "ASC";
        const [listProject, count] = await this.projectRepository
            .createQueryBuilder("project")
            .select(["project.id", "project.name", 'project.description', "project.rating", "project.createAt", 'project.updateAt'])
            .leftJoin("project.author", "author")
            .addSelect(["author.name", "author.id", "author.avatar"])
            .leftJoin("project.categoryList", "categories")
            .addSelect(["categories.name", "categories.link", "categories.id"])
            .leftJoin('project.thumb', 'thumb')
            .addSelect('thumb.id')
            .orderBy(type, shortCondition)
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();
        const maxPage = Math.ceil(count / pageSize);
        return { listProject, maxPage };
    }

    async getDetailProject(id: number) {
        try {
            return await this.projectRepository
                .createQueryBuilder('project')
                .select()
                .where('project.id = :id', { id })
                .leftJoin("project.author", "author")
                .addSelect(["author.name", "author.id", "author.avatar"])
                .leftJoin('project.video', 'video')
                .addSelect('video.id')
                .leftJoin('project.thumb', 'thumb')
                .addSelect('thumb.id')
                .leftJoin("project.imageList", "imageList")
                .addSelect("imageList.id")
                .leftJoin("project.categoryList", "categories")
                .addSelect(["categories.name", "categories.link", "categories.id"])
                .getOne();
        } catch (error) {
            throw new NotFoundException()
        }

    }

    async deleteProject(id: number) {
        const project = await this.projectRepository.findOne({
            where: { id }, relations: {
                video: true,
                thumb: true,
                imageList: true
            }
        });
        if (!project) {
            throw new NotFoundException("Not Found project")
        }
        const video = project.video;
        const thumb = project.thumb;
        const listImg = project.imageList
        try {
            if (video && existsSync(video.filePath)) {
                await this.deleteFileRepository.save({ path: video.filePath });
            }
            if (thumb && existsSync(thumb.path)) {
                await this.deleteFileRepository.save({ path: thumb.path });
            }
            if (listImg.length > 0) {
                for (const image of listImg) {
                    await this.deleteFileRepository.save({ path: image.path });
                }
            }
            await this.projectRepository.remove(project)
            return `Project ${project.name} has deleted`
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async updateProject(projectId: number, projectUpdate: ProjectUpdateDto) {
        let project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: { categoryList: true }
        })
        let listCategory: CategoryEntity[] = project.categoryList;

        if (projectUpdate.categoryIdList && projectUpdate.categoryIdList.length > 0) {
            listCategory = await Promise.all(projectUpdate.categoryIdList.map(async (id) => {
                const category = await this.categoryService.getOneById(id);
                if (!category) {
                    throw new NotFoundException('Category not found')
                }
                return category;
            }))
        }
        project = { ...project, ...projectUpdate, categoryList: listCategory };
        await this.projectRepository.save(project);
        return `Project ${project.name} was updated`;
    }

    async updateRatingProject(updateRatingDto: UpdateRatingDto) {
        let project = await this.projectRepository.findOne({ where: { id: updateRatingDto.id } });
        if (!project) {
            throw new NotFoundException();
        }
        project = { ...project, rating: updateRatingDto.rating }
        try {
            await this.projectRepository.save(project)
            return `Rating of ${project.name} was upload`
        } catch (error) {
            throw new InternalServerErrorException()
        }


    }

    async getNameProject(txtSearch: string) {
        return await this.projectRepository
            .createQueryBuilder('project')
            .select(['project.name', 'project.id'])
            .where('project.name LIKE :txtSearch', { txtSearch: `%${txtSearch}%` })
            .orderBy('project.name', 'ASC')
            .take(5)
            .getMany()

    }

    async getProjectByName(name: string) {
        return await this.projectRepository
            .createQueryBuilder('project')
            .select()
            .where('project.name LIKE :name', { name: `%${name}%` })
            .orderBy('project.name', 'ASC')
            .leftJoin("project.author", "author")
            .addSelect(["author.name", "author.id", "author.avatar"])
            .leftJoin("project.categoryList", "categories")
            .addSelect(["categories.name", "categories.link", "categories.id"])
            .leftJoin('project.thumb', 'thumb')
            .addSelect('thumb.id')
            .addOrderBy('project.createAt', 'DESC')
            .getMany();
    }

    async getListProjectByUserId(userId: number, pageNumber: number, pageSize: number, type: ProjectShort, short: boolean) {
        const skip: number = (pageNumber - 1) * pageSize;
        const [listProject, count] = await this.projectRepository.createQueryBuilder("project")
            .select(["project.id", "project.name", 'project.description', "project.rating", "project.createAt", 'project.updateAt'])
            .leftJoin("project.author", "author")
            .addSelect(["author.name", "author.id", "author.avatar"])
            .where("author.id = :userId", { userId })
            .leftJoin("project.categoryList", "categories")
            .addSelect(["categories.name", "categories.link", "categories.id"])
            .leftJoin('project.thumb', 'thumb')
            .addSelect('thumb.id')
            .orderBy(type, short ? "DESC" : 'ASC')
            .skip(skip)
            .take(pageSize)
            .getManyAndCount()
        const maxPage = Math.ceil(count / pageSize);
        return { listProject, maxPage };
    }

    async getListProjectByCategory(categoryLink: string, pageNumber: number, pageSize: number, type: ProjectShort, short: boolean) {
        const skip: number = (pageNumber - 1) * pageSize;
        const [listProject, count] = await this.projectRepository
            .createQueryBuilder("project")
            .select(["project.id", "project.name", 'project.description', "project.rating", "project.createAt", 'project.updateAt'])
            .leftJoin("project.author", "author")
            .addSelect(["author.name", "author.id", "author.avatar"])
            .leftJoin("project.categoryList", "categories")
            .addSelect(["categories.name", "categories.link", "categories.id"])
            .where("categories.link = :categoryLink", { categoryLink })
            .leftJoin('project.thumb', 'thumb')
            .addSelect('thumb.id')
            .orderBy(type, short ? "DESC" : "ASC")
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();
        const maxPage = Math.ceil(count / pageSize);
        return { listProject, maxPage };
    }




}
