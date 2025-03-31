import { ProjectEntity } from "src/project/entity/project-entity";
import { ChildEntity, JoinColumn, OneToOne } from "typeorm";
import { VideoEntity } from "./videos-entity";

@ChildEntity("video_project")
export class VideoProjectEntity extends VideoEntity {
    @OneToOne(() => ProjectEntity, (project) => project.video, { onDelete: 'CASCADE' })
    @JoinColumn()
    project: ProjectEntity
}