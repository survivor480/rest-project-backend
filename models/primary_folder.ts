import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'primary_folder'})
export class Primary_Folder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true, length: 200})
    folder_name: string

    @Column({nullable: false})
    user_number: number
}