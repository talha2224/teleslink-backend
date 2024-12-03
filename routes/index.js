const combineRouter = require("express").Router()
const physicanAccount = require("./physicans/account.router")
const cTemsAccount = require("./ctems/account.router")
const adminAccount = require("./admin/account.router")
const appointment = require("./physicans/appointment.router")
const chat = require("./chat/chat.router")
const message = require("./chat/message.router")







combineRouter.use("/physician",physicanAccount)
combineRouter.use("/ctems",cTemsAccount)
combineRouter.use("/admin",adminAccount)
combineRouter.use("/appointment",appointment)
combineRouter.use("/chat",chat)
combineRouter.use("/message",message)





module.exports = {combineRouter}