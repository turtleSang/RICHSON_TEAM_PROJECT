import { ProjectEntity } from "src/project/entity/project-entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ unique: true, type: 'varchar', length: 100 })
    name: string;

    @Column({
        unique: true,
        type: 'varchar',
        length: 15,
        name: 'link'
    })
    link: string;

    @Column({ type: 'varchar', length: 200 })
    description: string

    @ManyToOne(() => UserEntity, (user) => user.categoryCreateList)
    user: UserEntity

    @ManyToMany(() => ProjectEntity, (project) => project.categoryList, { onDelete: "CASCADE" })
    projectList: ProjectEntity[]

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date


}