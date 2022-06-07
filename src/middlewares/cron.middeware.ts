import cron from 'node-cron'
import PostService from '../services/post.service';
import { AppDataSource } from "../config/data-source";
import { Post } from '../entities/post.entity';

const postService = new PostService();
const threeYearsInSeconds = 3 * 365 * 24 * 60 * 60;
const scheduleString = '*/10 * * * *'

export default function checkOldPosts() {
    cron.schedule(scheduleString, async () => {
        await AppDataSource
            .createQueryBuilder()
            .softDelete()
            .from(Post)
            .where("date_add(created_at, interval 3 YEAR) < NOW()")
            .execute();
        
        console.log("Posts checked!");
    });
} 