import { Router } from "express";
import UserController from "../controllers/user.controller";

function usersRoute() {
    const router = Router();
    const userController = new UserController();
    router.get('/users', userController.getUsers);
    router.get('/users/:id', userController.getUser);
    return router;
}

export default usersRoute;