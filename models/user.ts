import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Workspace } from './workspace';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, length: 200 })
  fullname!: string;

  @Column({ nullable: false, length: 200 })
  username!: string;

  @Column({ nullable: false, length: 200 })
  password!: string;

  @Column({ nullable: false, length: 200 })
  phone_number!: string;

  @Column({ nullable: true, type: 'date' })
  date_of_birth!: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP"})
  createdAt!: string 

  @Column({nullable: true, length: 400})
  linkedin!: string

  @Column({nullable: true, length: 400})
  github!: string

  @Column({nullable: false, length: 200})
  email!: string
}
