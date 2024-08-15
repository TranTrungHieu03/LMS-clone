import {NextFunction, Response, Request} from "express";
import {catchAsyncError} from "../middleware/catchAsyncError";
import errorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import {createCourse, getAllCoursesService} from "../services/course.service";
import courseModel from "../models/course.model";
import {redis} from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "node:path";
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notification.model";
import userModel from "../models/user.model";

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
            await redis.set(courseId, JSON.stringify(course), "EX", 604800)
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
        //notification
        await notificationModel.create({
            user: req.user?._id,
            title: "New Question Received",
            message: `You have a new question in ${courseContent.title}`
        })
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
            await notificationModel.create({
                user: req.user?._id,
                title: "New Answer",
                message: `You have a new question reply in ${course?.name}`
            })
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

//add review in course
interface IAddReviewData {
    review: string
    courseId: string
    rating: number
    userId: string
}

export const addReview = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses
        const courseId = req.params.id
        
        // check if course already exists in userCourseList base on _id
        const courseExists = userCourseList?.some((course: any) => course.courseId.toString() === courseId.toString())
        
        if (!courseExists) {
            return next(new errorHandler("You are not eligible to access this course", 400))
        }
        const course = await courseModel.findById(courseId)
        const {review, rating} = req.body as IAddReviewData
        const reviewData: any = {
            user: req.user,
            comment: review,
            rating
        }
        course?.reviews.push(reviewData)
        let avg = 0;
        course?.reviews.forEach((rev: any) => {
            avg += rev.rating
        })
        if (course) {
            course.ratings = avg / course?.reviews.length
        }
        await course?.save()
        const notification = {
            title: "New Review Received",
            message: `${req.user?.name} has given a review in ${course?.name}`
        }
        //create notification
        
        res.status(200).json({
            success: true,
            course
        })
        
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})

//add reply in review
interface IAddReplyToReviewData {
    comment: string
    courseId: string
    reviewId: string
}

export const addReplyToReview = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {comment, courseId, reviewId} = req.body as IAddReplyToReviewData
        
        const course = await courseModel.findById(courseId)
        if (!course) {
            return next(new errorHandler("Course not found", 400))
        }
        
        const review = course?.reviews?.find((item: any) => item._id.equals(reviewId))
        if (!review) {
            return next(new errorHandler("Review not found", 400))
        }
        if (!review.commentReplies) {
            review.commentReplies = []
        }
        const replyData: any = {
            user: req.user,
            comment
        }
        review.commentReplies.push(replyData)
        await course?.save()
        
        res.status(200).json({
            success: true,
            course
        })
        
    } catch (err: any) {
        return next(new errorHandler(err.message, 500))
    }
})

//get all courses -- only admin
export const getAllCourses = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllCoursesService(res)
    } catch (err: any) {
        return next(new errorHandler(err.message, 400))
    }
})

//delete course
export const deleteCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const course=  await courseModel.findById(id)
        if (!course){
            return next(new errorHandler("Course not found", 404))
        }
        await  course.deleteOne({id})
        await  redis.del(id)
        
        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    } catch (err: any) {
        return next(new errorHandler(err.message, 400))
    }
})