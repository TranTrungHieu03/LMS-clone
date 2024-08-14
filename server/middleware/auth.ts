require('dotenv').config();
import {Response, Request, NextFunction} from 'express';
import {catchAsyncError} from "./catchAsyncError";
import errorHandler from "../utils/ErrorHandler";
import jwt, {JwtPayload} from "jsonwebtoken";
import {redis} from "../utils/redis";

//authentication
export const isAuthenticated = catchAsyncError(async (req: Request, _res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
    
    if (!access_token) {
        return next(new errorHandler("Please login to access this resource", 400))
    }
    
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
    if (!decoded) {
        return next(new errorHandler("Invalid token", 400))
    }
    const user = await redis.get(decoded.id)
    
    if (!user) {
        return next(new errorHandler("User not found", 400))
    }
    req.user = JSON.parse(user)
    next()
    
})

//validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || "")) {
            return next(new errorHandler(`Role ${req.user?.role} is not allowed to access this resource`, 400))
        }
        next()
    }
}