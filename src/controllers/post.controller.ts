import { Post } from "../entities/post.entity";
import { Request, Response } from "express";
import PostService from "../services/post.service";

const postService = new PostService();

class PostController {
    async getAll(req: Request, res: Response) {
        const allPosts = await postService.getAll();
        res.json(allPosts);
    }
    async getOne(req: Request, res: Response) {
        const postID = req.params.id;
        const result = await postService.getOne(parseInt(postID));
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: "The Post not found" });
    }
    async createOne(req: Request, res: Response) {
        const post = new Post();
        post.post_title = req.query.post_title as string;
        post.post_text = req.query.post_text as string;
        post.user_id = parseInt(req.query.user_id as string);
        const result = await postService.create(post);
        res.json({ message: "Created Post id = " + result });
    }
    async deleteOne(req: Request, res: Response) {
        const PostID = req.params.id;
        const result = await postService.delete(parseInt(PostID));
        if (result) {
            res.json({ message: "Post deleted", title: result.post_title, text: result.post_text, author_id: result.user_id });
            return;
        }
        res.status(404).json({ message: "Post to delete not found" });
    }
    async updateOne(req: Request, res: Response) {
        const PostID = req.params.id;
        const post = new Post();
        post.post_title = req.query.post_title as string;
        post.post_text = req.query.post_text as string;
        post.user_id = parseInt(req.query.user_id as string);
        const result = await postService.update(parseInt(PostID), post);
        if (result) {
            res.json({ message: "Updated Post id = " + result });
            return;
        }
        res.status(404).json({ message: "Post to update not found" });
    }
}
export default PostController;