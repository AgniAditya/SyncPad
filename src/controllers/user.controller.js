import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/apirError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { login, logout, registerNewUser } from '../services/user.service.js'
import { User } from '../models/user.model.js'

const registerUser = asyncHandler( async (req,res) => {
    try {
        const { username , email , password } = req.body
        if( !(username && email && password) ) throw new ApiError(404,"not enough data to register user");
    
        const createdUser = await registerNewUser(username,email,password)
    
        return res.status(200)
        .json(new ApiResponse(
            200,
            createdUser,
            "user register successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error.message || "Failed to register user");
    }
})

const loginUser = asyncHandler( async (req,res) => {
    try {
        const { username , email , password } = req.body
        if(!(username || email)) throw new ApiError(404,"credentials not found");
        if(!password) throw new ApiError(404,"password is required");
    
        const credential = username ? username : email
        const { loggedInUser , accessToken , refreshToken } = await login(credential,password)

        const options = {
            httpOnly : true,
            secure : true
        }

        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(new ApiResponse(
            200,
            loggedInUser,
            "user loggeIn successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error.message || "Failed to login user");
    }
})

const logoutUser = asyncHandler( async (req,res) => {
    try {
        const userId = req.user?.id;
        if(!userId) throw new ApiError(404,"user id not found");

        await logout(userId);

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(
            200,
            {},
            "user loggedOut successfully"
        ))
    } catch (error) {
        throw new ApiError(404,"invalid user id");
    }
})

export {
    registerUser,
    loginUser,
    logoutUser
}