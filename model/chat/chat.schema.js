const mongoose = require("mongoose")



const chatSchema = mongoose.Schema({
    ctemsId:{type:mongoose.Schema.Types.ObjectId,ref:"CtemsAccount"},
    physicianId:{type:mongoose.Schema.Types.ObjectId,ref:"PhysicianAccount"}
})



const Chat = mongoose.model('Chat',chatSchema,'Chat')

module.exports = Chat