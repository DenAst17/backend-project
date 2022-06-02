import { Request, Response } from "express";
import { generate } from "../utils/jsonWebTokenGenerator";
import UserService from "../services/user.service";

const userService = new UserService();

class AuthController {
    async login(req: Request, res: Response) {
        const userEmail = req.body.email;
        const user = await userService.getByEmail(userEmail);
        if (user) {
            delete user.password;
            const token = generate(user.email);
            res.json({user, token});
            return;
        }
        res.status(404).json({ message: "The user not found" });
    }
    async logout(req: Request, res: Response) {
        /*req.logout((err) => {
            if (err) { return next(err); }
            res.json({});
        });*/
        res.json({});
    }
}
export default AuthController;  