import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

@Entity({ name: 'image' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string;

    @CreateDateColumn()
    createDate: Date

}