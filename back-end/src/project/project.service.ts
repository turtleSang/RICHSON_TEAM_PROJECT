import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project-entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { ProjectCreateDto } from './dto/project-create-dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { CategoryEntity } from 'src/category/entity/category-entity';
import { ConditionProjectDto } from './dto/short-condition-dto';
import { unlink } from "fs/promises"
import { existsSync } from 'fs';
import { ProjectUpdateDto } from './dto/project-update-dto';
@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity) private projectRepository: Repository<ProjectEntity>,
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
                description: projectDto.description,
                name: projectDto.name
            })
            return `${project.name} has created`;
        } catch (error) {
            throw new BadRequestException('Server error', error)
        }
    }

    async getListProject(pageNumber: number, pageSize: number, conditionProjectDto: ConditionProjectDto
    ) {
        const skip: number = pageNumber * pageSize;
        const listProject = await this.projectRepository
            .createQueryBuilder("project")
            .select(["project.id", "project.name", "project.rating", "project.createAt"])
            .leftJoin("project.author", "author")
            .addSelect(["author.name", "author.id", "author.avatar"])
            .leftJoin("project.categoryList", "categories")
            .addSelect(["categories.name", "categories.link", "categories.id"])
            .orderBy(conditionProjectDto.type, conditionProjectDto.short ? "ASC" : "DESC")
            .skip(skip)
            .take(pageSize)
            .getMany();
        return listProject;
    }

    async getDetailProject(id: number) {
        try {
            return await this.projectRepository
                .createQueryBuilder('project')
                .select()
                .where('project.id = :id', { id })
                .addSelect(["author.name", "author.id", "author.avatar"])
                .leftJoin("project.categoryList", "categories")
                .addSelect(["categories.name", "categories.link", "categories.id"])
                .leftJoin("project.video", 'video')
                .addSelect('video.id')
                .getOneOrFail();
        } catch (error) {
            throw new NotFoundException("Not Found project", error)
        }
    }

    async deleteProject(id: number) {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new NotFoundException("Not Found project")
        }
        const video = await project.video
        try {
            if (video && existsSync(video.filePath)) {
                await unlink(video.filePath)
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



}
