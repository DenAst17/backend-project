import { Router } from "express";
import PostController from "../controllers/post.controller"
import jwtAuthenticate from "../middlewares/jwtAuthenticate.middleware";

function postsRoute() {
    const router = Router();
    const postController = new PostController();
    router.get('/api/posts', jwtAuthenticate, postController.getAll);
    router.get('/api/posts/:id', jwtAuthenticate, postController.getOne);
    router.post('/api/posts', jwtAuthenticate, postController.createOne);
    router.delete('/api/posts/:id', jwtAuthenticate, postController.deleteOne);
    router.patch('/api/posts/:id', jwtAuthenticate, postController.updateOne);
    //router.get('/api/users/:id/posts', postController.getUserPosts);
    //router.get('/api/users/:userID/posts/:postID', postController.getUserPost);
    return router;
}

export default postsRoute;