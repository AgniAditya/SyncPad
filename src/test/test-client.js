import { io } from "socket.io-client"

const socket = io("http://localhost:8000")

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  // Send test event
  socket.emit("test-event", { message: "Hello from client!" });
});

socket.on("server-response", (data) => {
  console.log("📩 Received from server:", data);
});
