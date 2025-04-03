import { ChildEntity, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ImageEntity } from "./image-entity";
import { ProjectEntity } from "src/project/entity/project-entity";

@ChildEntity('image_project')
export class ImageProjectEntity extends ImageEntity {
    @ManyToOne(() => ProjectEntity, (project) => project, { onDelete: 'CASCADE' })
    project: ProjectEntity
}