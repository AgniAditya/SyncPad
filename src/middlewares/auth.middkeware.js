import jwt  from "jsonwebtoken";
import { ApiError } from "../utily/apirError.js";
import { asyncHandler } from "../utily/asyncHandler.js";
import { ACCESS_TOKEN_SECERT } from "../config/env.config.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler( async (req,_,next) => {
    try {
        const token = req.cookies?.accessToken || eq.header("Authorization")?.replace("Bearer ","");
        if(!token) throw new ApiError(404,"unauthorized request");
    
        const decodedToken = jwt.verify(token,ACCESS_TOKEN_SECERT)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToekn");
        if(!user) throw new ApiError(401,"Invalid access token");
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token");
    }
})

export { verifyJWT }