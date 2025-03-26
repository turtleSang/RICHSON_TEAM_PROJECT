import { CategoryEntity } from "src/category/entity/category-entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    rating: number

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.listProject, { eager: true })
    author: UserEntity

    @ManyToMany(() => CategoryEntity, { nullable: false })
    @JoinTable()
    categoryList: CategoryEntity[]

}