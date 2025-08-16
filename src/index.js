import { ConnectDB } from "./config/db.config.js";
import {HTTP_PORT} from "./config/env.config.js"
import { app } from "./app.js";
import { setUpSocketIO } from "./socketserver.js";

await ConnectDB()
.then( () => {
    app.on("error", (error) => {
        console.log("App not able to connect with database",error);
        throw error;
    })
    app.listen(HTTP_PORT,() => {
        console.log(`HTTP Server is running at -> http://localhost:${HTTP_PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection FAILED !!",err)
})

try {
  setUpSocketIO()
} catch (err) {
  console.log("Socket connection FAILED !!", err)
}