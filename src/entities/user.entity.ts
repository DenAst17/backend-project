import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import { Post } from "./post.entity"

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
    @OneToMany(type => Post, post => post.user)
    posts: Post[]
}