const { getCtemsAllChats, getphysicianAllChats, createChat, getSingleChat } = require("../../services/chat/chat.service")

const router = require("express").Router()



router.post("/create",createChat)
router.get("/ctems/all/:id",getCtemsAllChats)
router.get("/physician/all/:id",getphysicianAllChats)
router.get("/single/:id",getSingleChat)




module.exports = router


