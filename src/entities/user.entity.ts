import {BaseEntity, Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity({name: 'users'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    surname: string
    @Column()
    email: string
    @Column()
    password: string
}