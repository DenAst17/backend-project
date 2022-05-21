import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

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
}