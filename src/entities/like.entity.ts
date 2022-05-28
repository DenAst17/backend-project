import {BaseEntity, Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn} from "typeorm"
import { Post } from "./post.entity"
import { User } from "./user.entity"

@Entity({name: 'likes'})
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    like_id:number
    @Column()
    user_id: number
    @Column()
    post_id: number
    @ManyToMany(type => User) @JoinTable()
    users: User[]
    @ManyToMany(type => Post) @JoinTable()
    posts: Post[]
}