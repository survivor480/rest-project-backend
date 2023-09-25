import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'variables'})
export class Variables {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true, length: 200})
    variable_name: string

    @Column({nullable: false})
    value: string

    @Column({nullable: false})
    environment_id: number
}