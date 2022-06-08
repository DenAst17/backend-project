import Queue from 'bull';
import { Post } from '../entities/post.entity';
import PostService from '../services/post.service';

const postService = new PostService();

const postsQueue = new Queue<Post>('Posts');

export async function addPostToQueue(post: Post) {
    console.log(post);
    await postsQueue.add(post);
}

function createPostsFromQueue() {
    postsQueue.process(async (job, done) => {
        const post = new Post;
        post.post_title = job.data.post_title;
        post.post_text = job.data.post_text;
        post.user_id = job.data.user_id;
        post.expired_at = job.data.expired_at;
        await postService.create(post);
        done();
    })
}
createPostsFromQueue();