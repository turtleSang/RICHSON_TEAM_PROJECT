import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entity/category-entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { CategoryCreateDto } from './dto/category-create-dto';
import { CategoryUpdateDto } from './dto/category-update-dto';


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
        private userService: UserService
    ) { }

    async createCategory(categoryCategoryDto: CategoryCreateDto, userId: number) {
        let category = await this.categoryRepository.findOneBy([{ name: categoryCategoryDto.name }, { link: categoryCategoryDto.link }]);
        if (category) {
            throw new BadRequestException(`Category name ${category.name} or link ${category.link} has existed`)
        }
        const user: UserEntity = await this.userService.findOneById(userId);

        if (!user) {
            throw new BadRequestException(`User not found`)
        }
        try {
            await this.categoryRepository.save({
                name: categoryCategoryDto.name,
                description: categoryCategoryDto.description,
                link: categoryCategoryDto.link,
                user: user
            })
            return `Category ${categoryCategoryDto.name} has create`
        } catch (error) {
            console.log(error);

            throw new BadRequestException('Server Error', { cause: error })
        }

    }

    async getAllCategory() {
        return await this.categoryRepository.createQueryBuilder('category')
            .select(["category.name", "category.id", "category.link"])
            .leftJoin('category.videoThumb', 'videoThumb')
            .addSelect(['videoThumb.id'])
            .getMany()
    }

    async updateCateory(id: number, categoryUpdate: CategoryUpdateDto) {
        let category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new NotFoundException("Can not find category");
        }
        category = { ...category, ...categoryUpdate };
        try {
            return await this.categoryRepository.save(category)
        } catch (error) {
            throw new InternalServerErrorException("Can not update", error)
        }
    }

    async deleteCategory(id: number) {
        const category = await this.categoryRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Not found Category');
        }

        try {
            await this.categoryRepository.delete({ id });
            return `Category ${category.name} has removed`;
        } catch (error) {
            throw new BadRequestException('Server error')
        }

    }

    async getOneById(id: number) {
        return this.categoryRepository.findOneBy({ id });
    }



}   
