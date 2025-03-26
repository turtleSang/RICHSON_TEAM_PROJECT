import { Role } from "src/auth/roles/roles.decorator";
import { CategoryEntity } from "src/category/entity/category-entity";
import { ProjectEntity } from "src/project/entity/project-entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number

    @Column({
        type: 'varchar',
        length: 255
    })
    name: string

    @Column({
        type: 'varchar',
        name: 'email',
        length: 255,
        nullable: true,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: true,
        unique: true
    })
    googleId: string;

    @Column({
        type: 'text',
        nullable: true
    })
    avatar: string;

    @Column({
        type: 'enum',
        enum: ['admin', 'member', 'viewer'], default: 'viewer'
    })
    role: Role;

    @OneToMany(() => CategoryEntity, (category) => category.user, { lazy: true })
    categoryCreateList: Promise<CategoryEntity[]>;

    @OneToMany(() => ProjectEntity, (project) => project.author, { lazy: true })
    listProject: Promise<ProjectEntity[]>

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;


}