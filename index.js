const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const axios = require('axios');
const io = require("socket.io")(server);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

io.on("connection", (socket) => {
  console.log("WebSocket connection established");

  socket.on("message",async (message) => {
    console.log("Received WebSocket message:", message);
    io.emit("message",  message);
     // Call the API endpoint to save the message
     try {
      const response = await axios.post('http://localhost:8086/chats/message', message);
      console.log("API response:", response.data);
    } catch (error) {
      console.log("API error:", error.message);
    }
  });
});

const saveMessage = (message) => {};

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
