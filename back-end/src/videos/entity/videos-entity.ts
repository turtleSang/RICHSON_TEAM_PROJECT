import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity({ name: 'video' })
@TableInheritance({ column: { type: "varchar", name: "type" } })
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


}