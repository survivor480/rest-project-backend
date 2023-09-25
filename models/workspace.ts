import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'workspace'})
export class Workspace {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true, length: 200})
    workspace_name: string

    @Column({nullable: false})
    user_id: number
    
    @Column({nullable: false})
    default: boolean
}