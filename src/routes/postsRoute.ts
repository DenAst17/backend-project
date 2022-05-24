import { Router } from "express";
import PostController from "../controllers/post.controller"

function postsRoute() {
    const router = Router();
    const postController = new PostController();
    router.get('/api/posts', postController.getAll);
    router.get('/api/posts/:id', postController.getOne);
    router.post('/api/posts', postController.createOne);
    router.delete('/api/posts/:id', postController.deleteOne);
    router.patch('/api/posts/:id', postController.updateOne);
    //router.get('/api/users/:id/posts', postController.getUserPosts);
    //router.get('/api/users/:userID/posts/:postID', postController.getUserPost);
    return router;
}

export default postsRoute;