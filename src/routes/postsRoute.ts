import { Router } from "express";
import PostController from "../controllers/post.controller"

function postsRoute() {
    const router = Router();
    const postController = new PostController();
    router.get('/api/posts', postController.getAll);
    //router.get('/api/posts/:id', postController.getOne);
    //router.get('/api/users/:id/posts', postController.getUserPosts);
    //router.get('/api/posts/:userID/posts/:postID', postController.getUserPost);
    //router.post('/api/posts', postController.createOne);
    //router.delete('/api/posts/:id', postController.deleteOne);
    //router.patch('/api/posts/:id', postController.updateOne);
    return router;
}

export default postsRoute;