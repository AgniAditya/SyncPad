import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECERT, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECERT} from '../config/env.config.js'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["viewer","editor","admin"],
        default: "editor"
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.method.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            role: this.role
        },
        ACCESS_TOKEN_SECERT,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        REFRESH_TOKEN_SECERT,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)