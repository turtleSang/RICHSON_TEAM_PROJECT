import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ProjectCreateDto } from './dto/project-create-dto';
import { ValidatorPipe } from 'src/pipes/validator.pipe';
import { ProjectShort } from './dto/short-condition-dto';
import { OwnerGuard } from 'src/auth/owner/owner.guard';
import { ProjectUpdateDto } from './dto/project-update-dto';

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
    @Query('page', ParseIntPipe) pageNumber: number = 1,
    @Query('size', ParseIntPipe) pageSize: number = 4,
    @Query('type', new ValidatorPipe) type: ProjectShort,
    @Query('short', ParseBoolPipe) short: boolean

  ) {
    return await this.projectService.getListProject(pageNumber - 1, pageSize, type, short);
  }

  @Get("/detail/:id")
  async getDetailProject(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.getDetailProject(id)
  }

  @Put(':projectId')
  @UseGuards(JwtGuard, OwnerGuard, RoleGuard)
  @Roles('admin', 'member')
  async updateProject(@Body(ValidatorPipe) projectUpdate: ProjectUpdateDto, @Param('projectId', ParseIntPipe) projectId: number) {
    return await this.projectService.updateProject(projectId, projectUpdate)
  }

  @Delete(':id')
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
