import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'request_details'})
export class Request_Details {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true, length: 20})
    request_type: string

    @Column({nullable: true})
    primary_folder_id: number

    @Column({nullable: true})
    secondary_folder_id: number

    @Column({nullable: true})
    tertiary_folder_id: number

    @Column({nullable: true, length: 500})
    request_endpoint: string

    @Column({nullable: true})
    Authorization_Type: string

    @Column({nullable: false, default: 'None', length: 50})
    body_type: string
}