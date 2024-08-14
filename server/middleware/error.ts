import ErrorHandler from "../utils/ErrorHandler";
import {NextFunction,Request,Response} from "express";
 const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal error";
    
    //wrong mongoose id error
    if (err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    //duplicate error
    if (err.name === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`
        err = new ErrorHandler(message, 400)
    }
    //wrong jwt error
    if (err.name === 'JsonWebTokenError'){
        const message = `Json web token is invalid, try again.`
        err = new ErrorHandler(message, 400)
    }
    //Jwt expired error
    if (err.name === 'TokenExpiredError'){
        const message = `Json web token is expired, try again.`
        err = new ErrorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export default errorMiddleware