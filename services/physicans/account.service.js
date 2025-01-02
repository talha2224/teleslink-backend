const PhysicianAccount = require("../../model/physicans/account.model");
const bcrypt = require('bcryptjs')
const { sendDynamicMail } = require("../../utils/email");
const { uploadFile } = require("../../utils/function");

const createAccount = async (req, res) => {
    try {
        let { role, name, email, password, npi, affilation, phone, clinicAddress, daysAvailable, startTime, endTime,longitude,latitude  } = req.body;
        let findAccount = await PhysicianAccount.findOne({ email: email })
        if (findAccount) {
            console.log(findAccount?._id)
            return res.status(403).json({ msg: "Account already exits", status: 403, data: null })
        }
        else {
            let hash = await bcrypt.hash(password, 10)
            let otp = Math.floor(Math.random() * 9000) + 1000;
            let validTill = new Date(new Date().setMinutes(new Date().getMinutes() + 5))
            let create = await PhysicianAccount.create({ role, name, email, password: hash, npi, affilation, phone, clinicAddress, daysAvailable, startTime, endTime, otp, otpValidTill: validTill,longitude,latitude  })
            if (create) {
                await sendDynamicMail("verification", email, name, otp)
                return res.status(200).json({ status: 200, data: create, msg: "Account has been created we have sent you a verification email" })
            }
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}

const resendOtp = async (req, res) => {
    try {
        let { userId } = req.body;
        let userInfo = await PhysicianAccount.findById(userId)
        if (userInfo) {
            let otp = Math.floor(Math.random() * 9000) + 1000;
            let validTill = new Date(new Date().setMinutes(new Date().getMinutes() + 5))
            let update = await PhysicianAccount.findByIdAndUpdate(userId, { otp, otpValidTill: validTill }, { new: true })
            if (update) {
                await sendDynamicMail("verification", userInfo?.email, userInfo?.name, otp)
                return res.status(200).json({ status: 200, data: null, msg: "Otp sent" })
            }
        }
        else {
            return res.status(404).json({ status: 404, msg: "Invalid user id", data: null })
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}

const sendOtpToEmail = async (req, res) => {
    try {
        let { email } = req.body;
        let userInfo = await PhysicianAccount.findOne({email})
        if (userInfo) {
            let otp = Math.floor(Math.random() * 9000) + 1000;
            let validTill = new Date(new Date().setMinutes(new Date().getMinutes() + 5))
            let update = await PhysicianAccount.findByIdAndUpdate(userInfo?._id, { otp, otpValidTill: validTill }, { $new: true })
            if (update) {
                await sendDynamicMail("verification", userInfo?.email, userInfo?.name, otp)
                return res.status(200).json({ status: 200, data: userInfo?._id, msg: "Otp sent" })
            }
        }
        else {
            return res.status(404).json({ status: 404, msg: "Invalid Email", data: null })
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}


const verifyOtp = async (req, res) => {
    try {
        let { userId, otp } = req.body
        let userInfo = await PhysicianAccount.findById(userId)
        if (userInfo) {
            let compareOtp = userInfo.otp === otp
            if (!compareOtp) {
                return res.status(400).json({ status: 400, msg: "Invalid otp", data: null })
            }
            else {
                let isExpired = new Date() > new Date(userInfo.otpValidTill);
                if (isExpired) {
                    let otp = Math.floor(Math.random() * 9000) + 1000;
                    let validTill = new Date(new Date().setMinutes(new Date().getMinutes() + 5))
                    let update = await PhysicianAccount.findByIdAndUpdate(userId, { otp, otpValidTill: validTill }, { new: true })
                    await sendDynamicMail("verification", userInfo?.email, userInfo?.name, otp)
                    return res.status(403).json({ status: 403, msg: "OTP expired new otp has been sent", data: null })
                }
                else {
                    let update = await PhysicianAccount.findByIdAndUpdate(userId, { otpVerified: true }, { new: true })
                    return res.status(200).json({ status: 403, msg: "Account Verified", data: update })
                }

            }
        }
        else {
            return res.status(404).json({ status: 404, msg: "Invalid user id", data: null })
        }

    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}

const verifyOtpForResetPassword = async (req, res) => {
    try {
        let { userId, otp } = req.body
        let userInfo = await PhysicianAccount.findById(userId)
        if (userInfo) {
            let compareOtp = userInfo.otp === otp
            if (!compareOtp) {
                return res.status(400).json({ status: 400, msg: "Invalid otp", data: null })
            }
            else {
                let isExpired = new Date() > new Date(userInfo.otpValidTill);
                if (isExpired) {
                    let otp = Math.floor(Math.random() * 9000) + 1000;
                    let validTill = new Date(new Date().setMinutes(new Date().getMinutes() + 5))
                    let update = await PhysicianAccount.findByIdAndUpdate(userId, { otp, otpValidTill: validTill }, { $new: true })
                    await sendDynamicMail("verification", userInfo?.email, userInfo?.name, otp)
                    return res.status(403).json({ status: 403, msg: "OTP expired new otp has been sent", data: null })
                }
                else {
                    let update = await PhysicianAccount.findByIdAndUpdate(userId, { resetVerified: true }, { $new: true })
                    return res.status(200).json({ status: 403, msg: "Account Verified", data: update })
                }

            }
        }
        else {
            return res.status(404).json({ status: 404, msg: "Invalid user id", data: null })
        }

    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}

const changePassword = async (req, res) => {
    try {
        let { userId,password} = req.body
        let userInfo = await PhysicianAccount.findById(userId)
        if (userInfo?.resetVerified) {
            let hash = await bcrypt.hash(password, 10)
            let updateInfo = await PhysicianAccount.findByIdAndUpdate(userId,{password:hash,resetVerified:false},{new:true})
            return res.status(404).json({ status: 404, msg: "Password Changed", data: updateInfo })
        }
        else {
            return res.status(404).json({ status: 404, msg: "Invalid user id or reset password not verified", data: null })
        }

    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}

const loginAccount = async (req, res) => {
    try {
        let { email, password } = req.body
        let findAccount = await PhysicianAccount.findOne({ email: email })
        if (!findAccount) {
            return res.status(404).json({ msg: "Account not exits", status: 404, data: null })
        }
        else {
            if (!findAccount?.otpVerified) {
                let otp = Math.floor(Math.random() * 9000) + 1000;
                let validTill = new Date(new Date().setMinutes(new Date().getMinutes() + 5))
                let update = await PhysicianAccount.findByIdAndUpdate(findAccount?._id, { otp, otpValidTill: validTill }, { new: true })
                await sendDynamicMail("verification", findAccount?.email, findAccount?.name, otp)
                return res.status(403).json({ status: 403, msg: "Your account is not verified we have sent otp to your email", data: null })
            }
            else {
                let compare = await bcrypt.compare(password, findAccount?.password)
                if (!compare) {
                    return res.status(400).json({ status: 400, msg: "Invalid credentials", data: null })
                }
                else {
                    return res.status(200).json({ status: 200, msg: "Login Successfull", data: findAccount })
                }
            }
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}


const getUserById = async (req, res) => {
    try {
        let findAccount = await PhysicianAccount.findById(req.params.id)
        if (!findAccount) {
            return res.status(404).json({ msg: "Account not exits", status: 404, data: null })
        }
        else {
            return res.status(200).json({ status: 200, msg: null, data: findAccount })
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}


const getAllPhysicians = async (req, res) => {
    try {
        console.log('ENTER')
        let findAccount = await PhysicianAccount.find({})
        if (findAccount.length == 0) {
            return res.status(404).json({ msg: "Account not exits", status: 404, data: null })
        }
        else {
            return res.status(200).json({ status: 200, msg: null, data: findAccount })
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: error, data: null })
    }
}



const updateProfile = async (req, res) => {
    try {
        let { name } = req.body
        let image = req.file

        if (image) {
            let url = await uploadFile(image);
            let update = await PhysicianAccount.findByIdAndUpdate(req.params.id, { name: name, profileImage: url }, { new: true })
            return res.status(200).json({ msg: null, data: update, status: 200 })
        }
        else {
            let update = await PhysicianAccount.findByIdAndUpdate(req.params.id, { name: name }, { new: true })
            return res.status(200).json({ msg: null, data: update, status: 200 })
        }
    }
    catch (error) {

    }
}

const updatePhone = async (req, res) => {
    try {

        let { phone } = req.body
        let update = await PhysicianAccount.findByIdAndUpdate(req.params.id, { phone: phone }, { new: true })
        return res.status(200).json({ msg: null, data: update, status: 200 })

    }
    catch (error) {

    }
}



module.exports = {sendOtpToEmail,verifyOtpForResetPassword,changePassword, createAccount, resendOtp, verifyOtp, loginAccount, getUserById, getAllPhysicians,updateProfile,updatePhone }