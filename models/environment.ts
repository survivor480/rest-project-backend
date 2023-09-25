import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'environment'})
export class Environment {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable: false, length: 200})
    environment_name: string

    @Column({nullable: false})
    default: boolean

    @Column({nullable: false})
    type: string

    @Column({nullable: false})
    user_number: number
}