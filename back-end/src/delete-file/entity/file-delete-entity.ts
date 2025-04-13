import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'delete_file' })
export class FileDeleteEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number

    @Column({
        type: 'varchar'
    })
    path: string
}