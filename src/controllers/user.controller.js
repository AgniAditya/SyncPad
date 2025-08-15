import { User } from "../models/user.model.js"
import { asyncHandler } from '../utily/asyncHandler.js'
import { ApiError } from "../utily/apirError.js"
import { ApiResponse } from "../utily/apiResponse.js"
import validator from 'validator'

const registerUser = asyncHandler( async (req,res) => {
    try {
        const { username , email , password } = req.body
        if( !(username || email || password) ) throw new ApiError(404,"not enough data to register user");
    
        const existedUser = await User.findOne({
            $or: [{username} , {email}]
        })
        if(existedUser) throw new ApiError(400,"user already register");
        if(username.trim() === '' || password.trim() === '') throw new ApiError(400,"invalid username or password");
        if(!validator.isEmail(email)) throw new ApiError(400,"invalid email");
    
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if(!createdUser) throw new ApiError(500,"Server is not successfull to register user");
    
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
    
})

const logoutUser = asyncHandler( async (req,res) => {
    
})

export {
    registerUser,
    loginUser,
    logoutUser
}