import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Secondary_Folder } from './secondary_folder';

@Entity({name: 'tertiary_folder'})
export class Tertiary_Folder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true, length: 200})
    folder_name: string

    @Column({nullable: false})
    secondary_folder_number: number

}