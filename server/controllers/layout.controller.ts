import {NextFunction, Request, Response} from 'express';
import errorHandler from "../utils/ErrorHandler";
import layoutModel from "../models/layout.model";
import {catchAsyncError} from "../middleware/catchAsyncError";
import cloudinary from "cloudinary";
import {getAllOrdersService} from "../services/order.service";

//create layout
export const createLayout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {type} = req.body;
        const isTypeExist = await layoutModel.findOne({type})
        if (isTypeExist) {
            return next(new errorHandler(`${type} already exist`, 400))
        }
        if (type === "Banner") {
            const {image, title, subTitle} = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout"
            })
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                title,
                subTitle
            }
            await layoutModel.create(banner)
        }
        if (type === "FAQ") {
            const {faq} = req.body;
            const faqItems = await Promise.all(
                faq.map(async (faqItem: any) => {
                    return {
                        question: faqItem.question,
                        answer: faqItem.answer,
                    }
                })
            )
            await layoutModel.create({type: "FAQ", faq: faqItems})
        }
        if (type === "Categories") {
            const {categories} = req.body;
            const categoryItems = await Promise.all(
                categories.map(async (category: any) => {
                    return {
                        title: category.title,
                    }
                })
            )
            await layoutModel.create({type: "Categories", categories: categoryItems})
        }
        res.status(200).json({
            success: true,
            message: "Layout created successfully",
        })
        
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})

//edit layout
export const editLayout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {type} = req.body;
        if (type === "Banner") {
            const bannerData: any = await layoutModel.findOne({type: "Banner"})
            const {image, title, subTitle} = req.body;
            if (bannerData) {
                await cloudinary.v2.uploader.destroy(bannerData.image.public_id)
            }
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout"
            })
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                title,
                subTitle
            }
            await layoutModel.findByIdAndUpdate(bannerData.id, {banner})
        }
        if (type === "FAQ") {
            const {faq} = req.body;
            const faqData = await layoutModel.findOne({type: "FAQ"})
            const faqItems = await Promise.all(
                faq.map(async (faqItem: any) => {
                    return {
                        question: faqItem.question,
                        answer: faqItem.answer,
                    }
                })
            )
            await layoutModel.findByIdAndUpdate(faqData?._id, {type: "FAQ", faq: faqItems})
        }
        if (type === "Categories") {
            const {categories} = req.body;
            const categoriesData = await layoutModel.findOne({type: "Categories"})
            const categoryItems = await Promise.all(
                categories.map(async (category: any) => {
                    return {
                        title: category.title,
                    }
                })
            )
            await layoutModel.findByIdAndUpdate(categoriesData?._id, {type: "Categories", categories: categoryItems})
        }
        res.status(200).json({
            success: true,
            message: "Layout updated successfully",
        })
        
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})
//get layout by type
export const getLayoutByType = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {type} = req.body
        const layout = await layoutModel.findOne({type})
        res.status(200).json({
            success: true,
            layout
        })
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})
