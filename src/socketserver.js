import { Server } from "socket.io";
import http from 'http'
import { app } from "./app.js";
import { CORS_ORIGIN } from "./config/env.config.js";

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: CORS_ORIGIN,
        methods: ["GET","POST"]
    }
})

io.on('connection',(socket) => {
    console.log("A user connected:", socket.id);

    socket.on("test-event", (data) => {
        console.log("Received from client:", data);

        // Send back response
        socket.emit("server-response", { msg: "Hello from server!" });
    });
})

export {server}