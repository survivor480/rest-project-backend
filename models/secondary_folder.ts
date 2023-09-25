import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'secondary_folder'})
export class Secondary_Folder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true, length: 200})
    folder_name: string

    @Column({nullable: false})
    primary_folder_id: number
}