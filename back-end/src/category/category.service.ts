import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entity/category-entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { CategoryCreateDto } from './dto/category-create-dto';


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
        private userService: UserService
    ) { }

    async createCategory(categoryCategoryDto: CategoryCreateDto, userId: number) {
        let category = await this.categoryRepository.findOneBy({ name: categoryCategoryDto.name });
        if (category) {
            throw new BadRequestException(`Category ${category.name} has existed`)
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
            .select("category.name")
            .addSelect("category.id")
            .addSelect("category.link")
            .addSelect("category.thumb")
            .getMany()
    }

    async deleteCategory(id: number) {

        const category = await this.categoryRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Not found Category');
        }

        try {
            await this.categoryRepository.remove(category);
            return `Category ${category.name} has removed`;
        } catch (error) {
            throw new BadRequestException('Server error')
        }

    }

    async getOneById(id: number) {
        return this.categoryRepository.findOneBy({ id });
    }



}   
