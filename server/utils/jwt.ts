import {IUser} from "../models/user.model";

require('dotenv').config();
import {Response} from "express"
import {redis} from "./redis";
import {RedisKey} from "ioredis";

interface ITokenOptions {
    expires: Date
    maxAge: number
    httpOnly: boolean
    sameSite: 'lax' | 'strict' | 'none' | undefined
    secure?: boolean
}

//parse environment variables to integrate with fallback value
const accessTokenExpires = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10)
const refreshTokenExpires = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10)

//option for cookies
export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000),
    maxAge: accessTokenExpires * 60 * 60 * 1000,
    sameSite: 'lax',
    httpOnly: true,
}
export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpires * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpires * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    httpOnly: true,
}
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    
    //upload session to redis
    redis.set(user._id as RedisKey, JSON.stringify(user) as any)
    
    //only set secure to true in production
    if (process.env.NODE_ENV === "production") {
        accessTokenOptions.secure = true;
    }
    
    res.cookie("access_token", accessToken, accessTokenOptions)
    res.cookie("refresh_token", refreshToken, refreshTokenOptions)
    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}