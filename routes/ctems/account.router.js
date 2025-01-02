const { multipleupload } = require("../../config/multer.config")
const { createAccount, loginAccount, resendOtp, verifyOtp, getUserById, updateEquiments, getAllCtems, updateProfile, updatePhone, sendOtpToEmail, verifyOtpForResetPassword, changePassword } = require("../../services/ctems/account.service")

const router = require("express").Router()



router.post("/register",createAccount)
router.post("/login",loginAccount)
router.post("/resend/otp",resendOtp)
router.post("/reset/password",sendOtpToEmail)
router.post("/verify/otp",verifyOtp)
router.post("/verify/otp/reset/password",verifyOtpForResetPassword)
router.post("/change/password",changePassword)

router.get("/get/:id",getUserById)
router.get("/all",getAllCtems)
router.put("/update-equipments/:id",updateEquiments)


router.put("/update-profile/:id",multipleupload.single("image"),updateProfile)
router.put("/update-phone/:id",updatePhone)






module.exports = router


