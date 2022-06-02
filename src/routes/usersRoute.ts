import { response, Router } from "express";
import UserController from "../controllers/user.controller";
import HttpException from "../exceptions/http.exceptions";
import jwtAuthenticate from "../middlewares/jwtAuthenticate.middleware";

function usersRoute() {
    const router = Router();
    const userController = new UserController();
    router.get('/api/users', jwtAuthenticate, userController.getAll);
    router.get('/api/users/:id', jwtAuthenticate, userController.getOne);
    router.post('/api/users', jwtAuthenticate, userController.createOne);
    router.delete('/api/users/:id', jwtAuthenticate, userController.deleteOne);
    router.patch('/api/users/:id', jwtAuthenticate, userController.updateOne);
    return router;
}

export default usersRoute;