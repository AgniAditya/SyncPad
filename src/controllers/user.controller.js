import { asyncHandler } from '../utily/asyncHandler.js'
import { ApiError } from "../utily/apirError.js"
import { ApiResponse } from "../utily/apiResponse.js"
import { login, registerNewUser } from '../services/user.service.js'

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
    
})

export {
    registerUser,
    loginUser,
    logoutUser
}