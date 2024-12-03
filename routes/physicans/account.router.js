const { multipleupload } = require("../../config/multer.config")
const { createAccount, loginAccount, resendOtp, verifyOtp, getUserById, getAllPhysicians, updateProfile, updatePhone } = require("../../services/physicans/account.service")

const router = require("express").Router()



router.post("/register",createAccount)
router.post("/login",loginAccount)
router.post("/resend/otp",resendOtp)
router.post("/verify/otp",verifyOtp)
router.get("/get/:id",getUserById)
router.get("/all",getAllPhysicians)
router.put("/update-profile/:id",multipleupload.single("image"),updateProfile)
router.put("/update-phone/:id",updatePhone)



module.exports = router

