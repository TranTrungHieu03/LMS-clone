import {NextFunction, Request, Response} from 'express';
import {catchAsyncError} from "../middleware/catchAsyncError";
import userModel from "../models/user.model";
import errorHandler from "../utils/ErrorHandler";
import {redis} from "../utils/redis";
import {generateLast12MonthsData} from "../utils/analytics.generator";
import courseModel from "../models/course.model";
import orderModel from "../models/order.model";

//get users analytics - only admin
export const getUsersAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await generateLast12MonthsData(userModel)
        res.status(200).json({
            success: true,
            users
        })
    } catch (err: any) {
        return next(new errorHandler(err.message, 400))
    }
})
//get course analytics
export const getCoursesAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await generateLast12MonthsData(courseModel)
        res.status(200).json({
            success: true,
            courses
        })
    } catch (err: any) {
        return next(new errorHandler(err.message, 400))
    }
})
//get orders analytics
export const getOrdersAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await generateLast12MonthsData(orderModel)
        res.status(200).json({
            success: true,
            orders
        })
    } catch (err: any) {
        return next(new errorHandler(err.message, 400))
    }
})