import { Router } from "express";
import passport from "../middlewares/serialize.middleware";
import AuthController from "../controllers/auth.controller";
import HttpException from "../exceptions/http.exceptions";


function authRoute() {
    const router = Router();
    
    const authController = new AuthController();
    router.post('/api/login', passport.authenticate('local'), authController.login);
    router.post('/api/logout', authController.logout);
    return router;
}

export default authRoute;