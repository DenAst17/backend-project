import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/http.exceptions";

export default function errorHandler (err:HttpException, req: Request, res: Response, next: NextFunction) {
    if(err) {
        res.status(err?.httpCode || 500).json({message: err.message});
        return;
    }
    next();
}