import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CategoryCreateDto } from './dto/category-create-dto';
import { ValidatorPipe } from 'src/pipes/validator.pipe';

@Controller('category')
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


}
