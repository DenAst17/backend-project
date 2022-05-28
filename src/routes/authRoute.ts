import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller";
import HttpException from "../exceptions/http.exceptions";


function authRoute() {
    const router = Router();
    const authController = new AuthController();
    router.post('/login', passport.authenticate('local'), authController.login);
    return router;
}

export default authRoute;