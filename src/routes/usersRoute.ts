import { Router } from "express";
import UserController from "../controllers/user.controller";

function usersRoute() {
    const router = Router();
    const userController = new UserController();
    router.get('/api/users', userController.getUsers);
    router.get('/api/users/:id', userController.getUser);
    router.post('/api/users', userController.createUser);
    router.delete('/api/users/:id', userController.deleteUser as any);
    router.patch('/api/users/:id', userController.updateUser);
    return router;
}

export default usersRoute;