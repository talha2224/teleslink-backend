const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./connection/db.connection");
const { combineRouter } = require("./routes");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./model/chat/message.schema");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Database Connection
dbConnection();

// Routes
app.use("/api/v1", combineRouter);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is healthy" });
});

// 404 Fallback
app.use("*", (req, res) => {
  res.status(404).json({ msg: "This API does not exist" });
});

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Join Chat
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  // Send Message
  socket.on("send-message", async (data) => {
    try {
      const { chatId, physicianId, ctemsId, senderRole, message } = data;
      const newMessage = await Message.create({
        chatId,
        physicianId,
        ctemsId,
        senderRole,
        message,
      });
      io.to(chatId).emit("receive-message", newMessage);
    } catch (error) {
      console.error("Error saving message:", error.message);
      socket.emit("error", { msg: "Failed to send message" });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Error Handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

// Start Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Cleanup Logic on Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
