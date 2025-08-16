import { ConnectDB } from "./config/db.config.js";
import {PORT} from "./config/env.config.js"
import { server } from "./socketserver.js";

ConnectDB()
.then( () => {
    server.on("error", (error) => {
        console.log("App not able to connect with database",error);
        throw error;
    })
    server.listen(PORT,() => {
        console.log(`Server is running at -> http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection FAILED !!",err)
})