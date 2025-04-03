import { ChildEntity, OneToOne } from "typeorm";
import { ImageEntity } from "./image-entity";
import { ProjectEntity } from "src/project/entity/project-entity";

@ChildEntity('thumb_project')
export class ThumbProjectEntity extends ImageEntity {
    @OneToOne(() => ProjectEntity)
    project: ProjectEntity
}