const Chat = require("../../model/chat/chat.schema");
const Message = require("../../model/chat/message.schema");



const getCtemsAllChats = async (req, res) => {
    try {
        let chats = await Chat.find({ ctemsId: req.params.id }).populate("physicianId").populate("ctemsId");
        if (!chats || chats.length === 0) {
            return res.status(200).json({ msg: null, status: 200, data: [] });
        }
        const updatedChats = await Promise.all(chats.map(async (chat) => {
            let latestMessage = await Message.findOne({ chatId: chat._id }).sort({ createdAt: -1 });    
            return {...chat._doc,latestMessage: latestMessage || null,};
        }));
        return res.status(200).json({ msg: null, status: 200, data: updatedChats });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'An error occurred', status: 500 });
    }
};
const getphysicianAllChats = async (req, res) => {
    try {
        let chats = await Chat.find({ physicianId: req.params.id }).populate("physicianId").populate("ctemsId");
        if (!chats || chats.length === 0) {
            return res.status(200).json({ msg: null, status: 200, data: [] });
        }
        const updatedChats = await Promise.all(chats.map(async (chat) => {
            let latestMessage = await Message.findOne({ chatId: chat._id }).sort({ createdAt: -1 });
            return {...chat._doc,latestMessage: latestMessage || null,};
        }));
        return res.status(200).json({ msg: null, status: 200, data: updatedChats });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'An error occurred', status: 500 });
    }
};


const createChat = async (req, res) => {
    try {
        let { physicianId, ctemsId } = req.body
        let data = await Chat.findOne({ physicianId: physicianId, ctemsId: ctemsId })
        if (data?._id) {
            return res.status(200).json({ msg: null, status: 200, data: data })
        }
        else {
            let data = await Chat.create({ physicianId: physicianId, ctemsId: ctemsId })
            return res.status(200).json({ msg: "Chat Created", status: 200, data: data })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const getSingleChat = async (req, res) => {
    try {
        let data = await Chat.findById(req.params.id).populate("physicianId").populate("ctemsId")
        return res.status(200).json({ msg: null, status: 200, data: data })
    }
    catch (error) {
        console.log(error)
    }
}



module.exports = {getCtemsAllChats,getphysicianAllChats,getSingleChat,createChat}