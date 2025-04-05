import { ChildEntity, Column, JoinColumn, OneToOne } from "typeorm";
import { VideoEntity } from "./videos-entity";
import { CategoryEntity } from "src/category/entity/category-entity";

@ChildEntity("background_category")
export class VideoBackgroundEntity extends VideoEntity {
    @OneToOne(() => CategoryEntity, (category) => category.videoThumb, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn()
    category: CategoryEntity;
}