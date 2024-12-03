const express = require("express")
const cors = require("cors")
const { dbConnection } = require("./connection/db.connection")
const { combineRouter } = require("./routes")
require("dotenv").config()
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./model/chat/message.schema")

const app = express()
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"], }, });
const port = process.env.PORT || 3002

app.use(express.json())
app.use(cors({ origin: "*" }))
dbConnection()

app.use("/api/v1", combineRouter)



app.use("*", (req, res) => {
    res.status(404).json({ msg: "This Api Not Exits" })
})

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join-chat", (chatId) => {socket.join(chatId);console.log(`User joined chat: ${chatId}`);});

    socket.on("send-message", async (data) => {
        const { chatId, physicianId, ctemsId, senderRole, message } = data;
        const newMessage = await Message.create({chatId,physicianId,ctemsId,senderRole,message,});
        io.to(chatId).emit("receive-message", newMessage);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
