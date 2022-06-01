import { User } from "../entities/user.entity";
import { Request, Response } from "express";
import UserService from "../services/user.service";
import { getHash } from "../config/bcryptHashGenerator";

const userService = new UserService();

class UserController {
    async getAll(req: Request, res: Response) {
        const allUsers = await userService.getAll();
        res.json(allUsers);
    }
    async getOne(req: Request, res: Response) {
        const userID = req.params.id;
        const result = await userService.getByID(parseInt(userID));
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: "The user not found" });
    }
    async createOne(req: Request, res: Response) {
        const user = new User();
        user.name = req.body.name as string;
        user.surname = req.body.surname as string;
        user.email = req.body.email as string;
        user.password = getHash(req.body.password);
        const result = await userService.create(user);
        res.json(result);
    }
    async deleteOne(req: Request, res: Response) {
        const userID = req.params.id;
        const result = await userService.delete(parseInt(userID));
        if (result) {
            res.json({id: userID});
            return;
        }
        res.status(404).json({ message: "User to delete not found" });
    }
    async updateOne(req: Request, res: Response) {
        const userID = req.params.id;
        const user = new User();
        user.name = req.body.name as string;
        user.surname = req.body.surname as string;
        user.email = req.body.email as string;
        user.password = getHash(req.body.password);
        const result = await userService.update(parseInt(userID), user);
        if (result) {
            res.json({ message: "Updated user id = " + result });
            return;
        }
        res.status(404).json({ message: "User to update not found" });
    }
}
export default UserController;