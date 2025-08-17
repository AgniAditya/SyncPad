import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {CORS_ORIGIN} from './config/env.config.js'

const app = express()

app.use(cors({
    origin : CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit : '20kb'}))
app.use(express.urlencoded({extended:true,limit:'20kb'}))
app.use(cookieParser())

// Routes
import userRouter from './routes/user.route.js'
import dashboardRouter from './routes/dashboard.route.js'

app.use("/api/v1/user",userRouter)
app.use("/api/v1/dashboard",dashboardRouter)

export {app}