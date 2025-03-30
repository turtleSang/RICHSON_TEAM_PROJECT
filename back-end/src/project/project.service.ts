import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project-entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { ProjectCreateDto } from './dto/project-create-dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { CategoryEntity } from 'src/category/entity/category-entity';
import { ConditionProjectDto } from './dto/short-condition-dto';
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
        const listCategory: CategoryEntity[] = await Promise.all(projectDto.categoryId.map(async (id) => {
            const category = await this.categoryService.getOneById(id);
            if (category) {
                return category;
            }
        }))

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
            .select(["project.id", "project.name", "project.imgId", "project.rating", "project.createAt"])
            .leftJoin("project.author", "author")
            .addSelect(["author.name", "author.id", "author.avatar"])
            .leftJoin("project.categoryList", "categories")
            .addSelect(["categories.name", "categories.link", "categories.id", "categories.thumb"])
            .orderBy(conditionProjectDto.type, conditionProjectDto.short ? "ASC" : "DESC")
            .skip(skip)
            .take(pageSize)
            .getMany();
        return listProject;
    }

    async getDetailProject(id: number) {
        return await this.projectRepository
            .createQueryBuilder("project")
            .select(["project.id", "project.name", "project.rating", "project.createAt", "project.updateAt"])
            .where("project.id = :id", { id })
            .leftJoin("project.author", "author")
            .addSelect(["author.name", "author.id", "author.avatar"])
            .leftJoin("project.categoryList", "categories")
            .addSelect(["categories.name", "categories.link", "categories.id", "categories.thumb"])
            .leftJoin("project.video", "video")
            .addSelect(["video.id"])
            .getOne()

    }



}
