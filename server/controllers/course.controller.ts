import {NextFunction, Response, Request} from "express";
import {catchAsyncError} from "../middleware/catchAsyncError";
import errorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import {createCourse} from "../services/course.service";
import courseModel from "../models/course.model";
import {redis} from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "node:path";
import sendMail from "../utils/sendMail";

//upload course
export const uploadCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const thumbnail = data.thumbnail
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            })
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        createCourse(data, res, next)
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})

//edit course
export const editCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const thumbnail = data.thumbnail
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: 'courses'
            })
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        const courseId = req.params.id
        const course = await courseModel.findByIdAndUpdate(courseId,
            {
                $set: data
            }, {new: true})
        res.status(201).json({
            success: true,
            course
        })
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})

//get single course - without purchasing
export const getSingleCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const isCacheExist = await redis.get(courseId)
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist)
            res.status(200).json({
                success: true,
                course
            })
        } else {
            const course = await courseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")
            await redis.set(courseId, JSON.stringify(course))
            res.status(200).json({
                success: true,
                course
            })
        }
        
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})
//get all course
export const getAllCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isCacheExist = await redis.get('allCourses')
        if (isCacheExist) {
            const courses = JSON.parse(isCacheExist)
            res.status(200).json({
                success: true,
                courses
            })
        } else {
            const courses = await courseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")
            redis.set("allCourses", JSON.stringify(courses))
            res.status(200).json({
                success: true,
                courses
            })
        }
        
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})

//get course content - only for valid user
export const getCourseByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id
        const courseExists = userCourseList?.find((course: any) => course.courseId.toString() === courseId)
        if (!courseExists) {
            return next(new errorHandler("You are not eligible to access this course", 404))
        }
        const course = await courseModel.findById(courseId)
        const content = course?.courseData
        
        res.status(200).json({
            success: true,
            content
        })
        
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})

//add question in course
interface IAddQuestionData {
    question: string
    courseId: string
    contentId: string
}

export const addQuestion = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {question, courseId, contentId} = req.body as IAddQuestionData
        const course = await courseModel.findById(courseId)
        
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new errorHandler("Invalid content id", 400))
        }
        
        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))
        
        if (!courseContent) {
            return next(new errorHandler("Invalid content", 400))
        }
        
        //create a new question
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        }
        
        //add this question to our content
        courseContent.questions.push(newQuestion)
        //save
        await course?.save();
        res.status(200).json({
            success: true,
            course
        })
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})

//add answer in course question
interface IAddAnswerData {
    answer: string,
    questionId: string
    courseId: string
    contentId: string
}

export const addAnswer = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {answer, courseId, contentId, questionId} = req.body as IAddAnswerData
        const course = await courseModel.findById(courseId)
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new errorHandler("Invalid content id", 400))
        }
        
        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))
        
        if (!courseContent) {
            return next(new errorHandler("Invalid content", 400))
        }
        
        const question = courseContent.questions.find((item: any) => item._id.equals(questionId))
        if (!question) {
            return next(new errorHandler("Invalid question id", 400))
        }
        
        //create new answer
        const newAnswer: any = {
            user: req.user,
            answer
        }
        question.questionReplies.push(newAnswer)
        await course?.save();
        
        if (req.user?._id === question.user._id) {
            //create a notification
        } else {
            const data = {
                name: question.user.name,
                title: courseContent.title
            }
            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data)
            await sendMail({
                email: question.user.email,
                subject: "Question reply",
                template: "question-reply.ejs",
                data
            })
            res.status(200).json({
                success: true,
                course
            })
        }
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})