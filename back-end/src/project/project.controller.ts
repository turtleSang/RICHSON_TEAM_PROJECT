import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ProjectCreateDto } from './dto/project-create-dto';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { ConditionProjectDto } from './dto/short-condition-dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin', 'member')
  async createProject(@Body(new ValidatorPipe()) projectDto: ProjectCreateDto, @Req() req: any) {
    const { id } = req.user;
    return await this.projectService.createProject(projectDto, id);
  }

  @Get('list')
  async getProjects(
    @Query('page', ParseIntPipe) pageNumber: number = 1,
    @Query('size', ParseIntPipe) pageSize: number = 4,
    @Body(new ValidatorPipe) conditionProjectDto: ConditionProjectDto
  ) {
    return await this.projectService.getListProject(pageNumber - 1, pageSize, conditionProjectDto);
  }

  @Get("/detail/:id")
  async getDetailProject(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.getDetailProject(id)
  }


}
