import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'tertiary_folder'})
export class Tertiary_Folder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true, length: 200})
    folder_name: string

    @Column({nullable: false})
    secondary_folder_number: number
}