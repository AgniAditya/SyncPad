import { Server } from "socket.io";
import http from 'http'
import { app } from "./app.js";
import { CORS_ORIGIN, SOCKET_PORT } from "./config/env.config.js";
import { handleChatEvents } from "./socket/chat.socket.js";
import express from 'express'
import path from "path";

const setUpSocketIO = () => {
    const server = http.createServer(app)
    const io = new Server(server,{
        cors: {
            origin: CORS_ORIGIN,
            methods: ["GET","POST"]
        }
    })
    
    io.on('connection',(socket) => {
        console.log("A user connected:", socket.id);
    
        handleChatEvents(socket,io)
    })

    app.use(express.static(path.resolve("./public")))

    app.get('/',(_,res) => {
        return res.sendFile("/public/index.html")
    })
    
    server.on("error", (error) => {
        console.log("Socket server not able to connect",error);
        throw error;
    })
    
    server.listen(SOCKET_PORT,() => {
        console.log(`Socket server is running at -> http://localhost:${SOCKET_PORT}`);
    })
} 

export {setUpSocketIO}