import { ProjectEntity } from "src/project/entity/project-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'videos' })
export class VideosEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'fileName',
        type: 'varchar'
    })
    fileName: string;

    @Column({ name: 'path', type: 'varchar' })
    filePath: string;

    @OneToOne(() => ProjectEntity, { nullable: true })
    @JoinColumn()
    project: ProjectEntity
}