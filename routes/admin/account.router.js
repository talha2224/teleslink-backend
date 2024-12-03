const { createAccount, loginAccount, resendOtp, verifyOtp, getUserById } = require("../../services/admin/account.service")

const router = require("express").Router()



router.post("/register",createAccount)
router.post("/login",loginAccount)
router.post("/resend/otp",resendOtp)
router.post("/verify/otp",verifyOtp)
router.get("/get/:id",getUserById)



module.exports = router


