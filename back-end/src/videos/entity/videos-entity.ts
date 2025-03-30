import { ProjectEntity } from "src/project/entity/project-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'video' })
export class VideoEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'fileName',
        type: 'varchar'
    })
    fileName: string;

    @Column({ name: 'path', type: 'varchar' })
    filePath: string;

    @OneToOne(() => ProjectEntity, (project) => project.video)
    @JoinColumn()
    project: ProjectEntity
}