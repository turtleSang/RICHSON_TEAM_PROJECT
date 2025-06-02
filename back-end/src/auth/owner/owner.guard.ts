import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectEntity } from "src/project/entity/project-entity";
import { Repository } from "typeorm";

export class OwnerGuard implements CanActivate {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: any = context.switchToHttp().getRequest();
        const params: any = req.params;
        const { id } = req.user
        if (!params.id) {
            throw new BadRequestException("need id project to update")
        }

        if (!id) {
            throw new ForbiddenException();
        }
        try {
            const projectId = parseInt(params.id);
            const project = await this.projectRepository.findOneByOrFail({ id: projectId })
            if (project.author.id != id) {
                return false;
            }
            req.project = project
            return true;
        } catch (error) {
            throw new NotFoundException("project id not found");
        }
    }


}