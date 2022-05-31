import { Request, Response } from "express";

class AuthController {
    async login(req: Request, res: Response) {
        res.json({"email" : req.body.email, "password" : req.body.password});
    }
}
export default AuthController;