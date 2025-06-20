import { Body, Controller, Delete, Get, NotFoundException, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ProjectCreateDto } from './dto/project-create-dto';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { ProjectShort } from './dto/short-condition-dto';
import { OwnerGuard } from 'src/auth/owner/owner.guard';
import { ProjectUpdateDto } from './dto/project-update-dto';
import { ProjectEntity } from './entity/project-entity';
import { UpdateRatingDto } from './dto/update-rating-dto';
import { ListProjectQueryDto } from './dto/list-project-query-dto';

@Controller('api/project')
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
    @Query(new ValidatorPipe()) query: ListProjectQueryDto
  ) {
    const { listProject, maxPage } = await this.projectService.getListProject(query.page, query.size, query.type, query.short);
    if (listProject.length === 0) {
      throw new NotFoundException("Not found project")
    }

    return { listProject, maxPage };
  }

  @Get('list/user/:userId')
  async getProjectsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query(new ValidatorPipe) query: ListProjectQueryDto
  ) {
    const { listProject, maxPage } = await this.projectService.getListProjectByUserId(userId, query.page, query.size, query.type, query.short);
    if (listProject.length === 0) {
      throw new NotFoundException("Not found project")
    }

    return { listProject, maxPage };
  }

  @Get('list/category/:categoryLink')
  async getProjectsByCategory(
    @Param('categoryLink') categoryLink: string,
    @Query(new ValidatorPipe) query: ListProjectQueryDto
  ) {

    const { listProject, maxPage } = await this.projectService.getListProjectByCategory(categoryLink, query.page, query.size, query.type, query.short);

    if (listProject.length === 0) {
      throw new NotFoundException("Not found project")
    }

    return { listProject, maxPage };
  }

  @Get("/detail/:id")
  async getDetailProject(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.getDetailProject(id)
  }

  @Get('/search/name/:txtSearch')
  async getNameProject(@Param('txtSearch') txtSearch: string) {
    const listName: ProjectEntity[] = await this.projectService.getNameProject(txtSearch);
    if (listName.length === 0) {
      throw new NotFoundException()
    }
    return listName;

  }

  @Get('name/:name')
  async getProjectsByName(@Param('name') name: string) {
    const listProject: ProjectEntity[] = await this.projectService.getProjectByName(name);
    if (listProject.length === 0) {
      throw new NotFoundException()
    }
    return listProject;
  }

  @Put('base/:id')
  @UseGuards(JwtGuard, OwnerGuard, RoleGuard)
  @Roles('admin', 'member')
  async updateProject(@Body(ValidatorPipe) projectUpdate: ProjectUpdateDto, @Param('id', ParseIntPipe) projectId: number) {
    return await this.projectService.updateProject(projectId, projectUpdate)
  }

  @Put('rating')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  async updateRaingProject(@Body(ValidatorPipe) updateRating: UpdateRatingDto) {
    return await this.projectService.updateRatingProject(updateRating)
  }

  @Delete('/:id')
  @UseGuards(JwtGuard, OwnerGuard, RoleGuard)
  @Roles('member', 'admin')
  async deleteProject(@Param('id') id: number) {
    return await this.projectService.deleteProject(id)
  }

  @Delete('/admin/:id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('admin')
  async deleteByAdmin(@Param('id') id: number) {
    return await this.projectService.deleteProject(id)
  }
}
