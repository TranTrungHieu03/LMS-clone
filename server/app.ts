require('dotenv').config()
import express, {Request, Response, NextFunction} from "express"

export const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middleware/error";
import userRouter from "./routes/user.route"
import courseRouter from "./routes/course.route"
import orderRouter from "./routes/order.route"
import notificationRouter from "./routes/notification.route"
import analyticsRouter from "./routes/analytics.route"
import layoutRouter from "./routes/layout.route"
//body parser
app.use(express.json({limit: "50mb"}))

//cookie parser
app.use(cookieParser())

//cors -> cross-origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN,
}))

//route
app.use("/api/v1", userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter, layoutRouter)

//testing api
app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is running!'
    })
})
//unknown route
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    next(err)
})

app.use(errorMiddleware)