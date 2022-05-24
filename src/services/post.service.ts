import { AppDataSource } from "../data-source";
import { Post } from "../entities/post.entity";

class PostService {
    postRepository = AppDataSource.getRepository(Post);
    async getAll() {
        const allPosts = await this.postRepository.find();
        return allPosts;
    }
    async getOne(PostID: number) {
        const foundPost = await this.postRepository.findOneBy({
            id: PostID
        })
        return foundPost;
    }
    async create(Post: Post) {
        await AppDataSource.manager.save(Post)
        return Post;
    }
    async delete(PostID: number) {
        const postToRemove = await this.getOne(PostID);
        if (postToRemove) {
            await this.postRepository.remove(postToRemove);
            return postToRemove;
        }
        return null;
    }
    updateInfo(postToUpdate: Post, Post: Post) {
        postToUpdate.post_title = Post.post_title;
        postToUpdate.post_text = Post.post_text;
        postToUpdate.user_id = Post.user_id;
    }
    async update(PostID: number, Post: Post) {
        let postToUpdate = await this.getOne(PostID);
        if (postToUpdate) {
            this.updateInfo(postToUpdate, Post);
            await this.postRepository.save(postToUpdate)
            return postToUpdate.id;
        }
        return null;
    }
}

export default PostService;
