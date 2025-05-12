import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CategoryCreateDto } from './dto/category-create-dto';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { CategoryUpdateDto } from './dto/category-update-dto';
import { CategoryLinkParams } from './dto/category-link-params';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('/create')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  async create(@Body(new ValidatorPipe) categoryCreateDto: CategoryCreateDto, @Req() req: any) {
    const { id } = req.user;
    return this.categoryService.createCategory(categoryCreateDto, id);
  }

  @Get('/all')
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Get('/detail/:link')
  async getGetDetailByLink(@Param(new ValidatorPipe) params: CategoryLinkParams) {
    return await this.categoryService.getCategoryByLink(params.link)

  }

  @Put(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  async updateCategory(@Param('id', ParseIntPipe) id: number, @Body(ValidatorPipe) categoryUpdateDto: CategoryUpdateDto) {
    return await this.categoryService.updateCateory(id, categoryUpdateDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.deleteCategory(id)
  }


}
