import cron from 'node-cron'
import PostService from '../services/post.service';

const postService = new PostService();
const threeYearsInSeconds = 3 * 365 * 24 * 60 * 60;
const scheduleString = '*/10 * * * *'

export default function checkOldPosts() {
    cron.schedule(scheduleString, async () => {
        const allPosts = await postService.getAll();
        allPosts.forEach(post => {
            const updatedTimestamp = post.updated_at.getTime();
            const currentTimestamp = Date.now();
            if(currentTimestamp >= updatedTimestamp + threeYearsInSeconds) {
                const postID = post.id;
                postService.delete(postID);
            }
        });
        
        console.log("Posts checked!");
    });
} 