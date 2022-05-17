import { User } from "../entities/user.entity";
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
    async createUser(req: Request, res: Response) {
        const user = new User();
        user.name = req.query.name as string;
        user.surname = req.query.surname as string;
        user.email = req.query.email as string;
        const result = await userService.create(user);
        res.json({message: "Created user id = " + result});
    }
    async deleteUser(req: Request, res: Response) {
        const userID = req.params.id;
        const result = await userService.delete(parseInt(userID));
        if(result) {
            res.json({message: "User deleted", name: result.name, surname: result.surname, email: result.email});
            return;
        }
        res.status(404).json({message:"User to delete not found"});
        }
    async updateUser(req: Request, res: Response) {
        const userID = req.params.id;
        const user = new User();
        user.name = req.query.name as string;
        user.surname = req.query.surname as string;
        user.email = req.query.email as string;
        const result = await userService.update(parseInt(userID), user);
        if(result) {
            res.json({message: "Updated user id = " + result});
            return;
        }
        res.status(404).json({message:"User to update not found"});
    }
}
export default UserController;