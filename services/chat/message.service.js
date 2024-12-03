const Message = require("../../model/chat/message.schema");



const getAllMessages = async (req, res) => {
    try {
        let data = await Message.find({ chatId: req.params.id }).populate("physicianId").populate("ctemsId")
        return res.status(200).json({ msg: null, status: 200, data: data })
    }
    catch (error) {
        console.log(error)
    }
}

const sendMessage = async (req, res) => {
    try {
        let {chatId,physicianId, ctemsId,senderRole,message} = req.body
        let data = await Message.create({ physicianId: physicianId, ctemsId: ctemsId ,chatId,senderRole,message })
        return res.status(200).json({ msg: "Message Send", status: 200, data: data })
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = {getAllMessages,sendMessage}