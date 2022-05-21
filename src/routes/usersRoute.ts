import { Router } from "express";
import UserController from "../controllers/user.controller";

function usersRoute() {
    const router = Router();
    const userController = new UserController();
    router.get('/api/users', userController.getAll);
    router.get('/api/users/:id', userController.getOne);
    router.post('/api/users', userController.createOne);
    router.delete('/api/users/:id', userController.deleteOne);
    router.patch('/api/users/:id', userController.updateOne);
    return router;
}

export default usersRoute;