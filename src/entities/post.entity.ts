import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, Timestamp, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'posts'})
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    post_title: string
    @Column()
    post_text: String
    @Column()
    user_id: number
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
    @DeleteDateColumn()
    deleted_at: Date
    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({ name: "user_id" })
    user: User;
}