import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/post.entity";

class PostService {
    postRepository = AppDataSource.getRepository(Post);
    async getAll() {
        const allPosts = await this.postRepository.find();
        console.log(allPosts);
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
    async delete(postID: number) {
        const foundPost = await this.postRepository.findOneBy({
            id: postID
        });
        if (!foundPost) {
            return null;
        }
        await AppDataSource
            .createQueryBuilder()
            .softDelete()
            .from(Post)
            .where("id = :id", { id: postID })
            .execute();
        return postID;
    }
    async restore(postID: number) {
        await AppDataSource
            .createQueryBuilder()
            .restore()
            .from(Post)
            .where("id = :id", { id: postID })
            .execute();
        const foundPost = await this.postRepository.findOneBy({
            id: postID
        });
        if (!foundPost) {
            return null;
        }
        return postID;
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
