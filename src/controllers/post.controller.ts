import { Post } from "../entities/post.entity";
import { Request, Response } from "express";
import PostService from "../services/post.service";
import { DateTime } from "luxon";

const postService = new PostService();

class PostController {
    async getAll(req: Request, res: Response) {
        const allPosts = await postService.getAll();
        const postsToShow = [];
        allPosts.forEach(post => {
            if (post.expired_at != null) {
                
                const expiredDateTime = DateTime.fromJSDate(post.expired_at);

                if (expiredDateTime <= DateTime.now()) {
                    return;
                }
            }
            postsToShow.push(post);
        });
        res.json(postsToShow);
    }
    async getOne(req: Request, res: Response) {
        const postID = req.params.id;
        const result = await postService.getOne(parseInt(postID));
        if (result != null) {
            if (result.expired_at != null) {
                const expiredDateTime = DateTime.fromJSDate(result.expired_at);

                if (expiredDateTime <= DateTime.now()) {
                    res.json({ message: "The post expired" });
                    return;
                }
            }
            res.json(result);
            return;
        }
        res.status(404).json({ message: "The post not found" });
    }
    async createOne(req: Request, res: Response) {
        const post = new Post();
        post.post_title = req.body.post_title as string;
        post.post_text = req.body.post_text as string;
        post.user_id = parseInt(req.body.user_id as string);
        if (req.body.expired_at) {
            const dateTime = req.body.expired_at;
            post.expired_at = dateTime;
            console.log(post.expired_at);
        }
        const result = await postService.create(post);
        res.json(result);
    }
    async deleteOne(req: Request, res: Response) {
        const postID = req.params.id;
        const result = await postService.delete(parseInt(postID));
        if (result) {
            res.json({ id: postID });
            return;
        }
        res.status(404).json({ message: "Post to delete not found" });
    }
    async updateOne(req: Request, res: Response) {
        const PostID = req.params.id;
        const post = new Post();
        post.post_title = req.body.post_title as string;
        post.post_text = req.body.post_text as string;
        post.user_id = parseInt(req.body.user_id as string);
        const result = await postService.update(parseInt(PostID), post);
        if (result) {
            res.json({ message: "Updated post id = " + result });
            return;
        }
        res.status(404).json({ message: "Post to update not found" });
    }
    async restoreOne(req: Request, res: Response) {
        const postID = req.params.id;
        const result = await postService.restore(parseInt(postID));
        if (result) {
            res.json({ id: postID });
            return;
        }
        res.status(404).json({ message: "Post to restore not found" });
    }
}
export default PostController;