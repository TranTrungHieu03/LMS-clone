import {NextFunction, Request, Response} from "express";
import {catchAsyncError} from "../middleware/catchAsyncError";
import errorHandler from "../utils/ErrorHandler";
import {IOrder} from "../models/order.model";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import {getAllOrdersService, newOrder} from "../services/order.service";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notification.model";

//create order
export const createOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    {
        try {
            const {courseId, payment_info} = req.body as IOrder
            const user = await userModel.findById(req.user?._id)
            const courseExistInUser = user?.courses.some((course: any) => course.courseId.toString === courseId)
            
            if (courseExistInUser) {
                return next(new errorHandler("You have already purchased this course", 400))
            }
            
            const course = await courseModel.findById(courseId)
            if (!course) {
                return next(new errorHandler("Invalid course", 404))
            }
            
            const orderData: any = {
                courseId: course?._id,
                userId: user?._id
            }
            
            const mailData = {
                order: {
                    _id: courseId.slice(0, 6),
                    name: course.name,
                    price: course.price,
                    date: new Date().toLocaleDateString('en-US', {year: "numeric", month: "long", day: "numeric"})
                    
                }
            }
            const html = ejs.renderFile(path.join(__dirname, "../mails/order-confirmation.ejs"), {order: mailData});
            if (user) {
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData
                })
                user.courses.push({courseId})
                await user?.save()
                
                const notification = await notificationModel.create({
                    user: user._id,
                    title: "New Order",
                    message: `You have a new order from ${course.name}`,
                })
                
                course.purchased ? course.purchased += 1 : course.purchased
                
                await course.save()
                newOrder(orderData, res, next)
            }
            
        } catch (err: any) {
            return next(new errorHandler(err.message, 500))
        }
        
    }
})

//get all orders - only admin
export const getAllOrders = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllOrdersService(res)
    } catch (err: any) {
        return next(new errorHandler(err.message, 400))
    }
})