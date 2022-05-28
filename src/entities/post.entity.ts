import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'posts'})
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    post_title: string
    @Column()
    post_text: string
    @Column()
    user_id: number
    @ManyToOne(type => User, user => user.posts)
    user: User;
}