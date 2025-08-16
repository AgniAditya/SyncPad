import { User } from "../models/user.model.js"
import validator from 'validator'
import { ApiError } from "../utils/apirError.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false})

        return {accessToken , refreshToken};
    }
    catch(error){
        throw new ApiError(500,error.message || "Error while generating access and refresh token");
    }
}

const registerNewUser = async (username,email,password) => {
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

    return createdUser
}

const login = async (credential,password) => {
    const user = await User.findOne({
        $or: [
            { email: credential },
            { username: credential }
        ]
    })
    if(!user) throw new ApiError(404,"invalid user request");

    const validatePassword = await user.isPasswordCorrect(password);
    if(!validatePassword) throw new ApiError(400,"invalid password");

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return { loggedInUser , accessToken , refreshToken }
}

const logout = async (userId) => {
    await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
}

export {
    registerNewUser,
    login,
    logout
}