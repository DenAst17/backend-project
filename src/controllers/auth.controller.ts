import { Request, Response } from "express";
import UserService from "../services/user.service";

const userService = new UserService();

class AuthController {
    async login(req: Request, res: Response) {
        const userEmail = req.body.email;
        const result = await userService.getByEmail(userEmail);
        if (result) {
            result.password = req.body.password;
            res.json(result);
            return;
        }
        res.status(404).json({ message: "The user not found" });
    }
}
export default AuthController;