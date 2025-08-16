import { io } from "socket.io-client"

const socket = io(`http://localhost:8001`)

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  // Send test event
  socket.emit("chat-message", { message: "Hey Aditya" });
});

socket.on("chat-message-response", (data) => {
  console.log("📩 Received from server:", data);
});