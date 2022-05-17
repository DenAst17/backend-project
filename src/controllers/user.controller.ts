import { Request, Response } from "express";
import UserService from "../services/user.service";

const userService = new UserService();

class UserController {
    async getUsers(req: Request, res: Response) {
        const allUsers = await userService.getAll();
        res.json(allUsers);
    }
    async getUser(req: Request, res: Response) {
        const userID = req.params.id;
        const result = await userService.getOne(parseInt(userID));
        if(result) {
            res.json(result);
            return;
        }
        res.status(404).json({message: "The user not found"});
    }
}
export default UserController;