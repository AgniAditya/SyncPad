import { ConnectDB } from "./config/db.config.js";
import { app } from "./app.js";
import {PORT} from "./config/env.config.js"

ConnectDB()
.then( () => {
    app.on("error", (error) => {
        console.log("App not able to connect with database",error);
        throw error;
    })
    app.listen(PORT,() => {
        console.log(`Server is running at -> http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection FAILED !!",err)
})