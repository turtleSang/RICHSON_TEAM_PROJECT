import { CategoryEntity } from "src/category/entity/category-entity";
import { ImageProjectEntity } from "src/image/entity/image-project-entity";
import { ThumbProjectEntity } from "src/image/entity/image-project-thumb-entity";
import { UserEntity } from "src/user/entity/user.entity";
import { VideoProjectEntity } from "src/videos/entity/video-project-entity";
import { VideoEntity } from "src/videos/entity/videos-entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'project' })
export class ProjectEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'text' })
    description: string

    @Column({
        type: 'float',
        default: 0,
        precision: 3,
        scale: 2
    })
    rating: number;

    @OneToMany(() => ImageProjectEntity, (image) => image.project, { cascade: true, onDelete: 'CASCADE' })
    imageList: ImageProjectEntity[]

    @OneToOne(() => ThumbProjectEntity, (thumb) => thumb.project, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    thumb: ThumbProjectEntity;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(() => VideoProjectEntity, (video) => video.project, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    video: VideoProjectEntity

    @ManyToOne(() => UserEntity, (user) => user.listProject, { eager: true })
    author: UserEntity

    @ManyToMany(() => CategoryEntity, (category) => category.projectList, { cascade: true, onDelete: "CASCADE" })
    @JoinTable()
    categoryList: CategoryEntity[]

}