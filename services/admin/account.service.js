const AdminAccount = require("../../model/admin/account.model");
const bcrypt = require('bcryptjs')
const { sendDynamicMail } = require("../../utils/email");

const createAccount = async(req,res)=>{
    try {
        let {role,name,email,password,phone,address,multiFactor,accessLevel,thresholdSystemAlert,notificationMethod} = req.body;
        let findAccount = await AdminAccount.findOne({email:email})
        if(findAccount){
            console.log(findAccount?._id)
            return res.status(403).json({msg:"Account already exits",status:403,data:null})
        }
        else{
            let hash = await bcrypt.hash(password,10)
            let otp = Math.floor(Math.random() * 9000) + 1000;
            let validTill=new Date(new Date().setMinutes(new Date().getMinutes() + 5))
            let create = await AdminAccount.create({role,name,email,password:hash,phone,address,multiFactor,accessLevel,thresholdSystemAlert,notificationMethod,otp,otpValidTill:validTill})
            if(create){
                await sendDynamicMail("verification",email,name,otp)
                return res.status(200).json({status:200,data:create,msg:"Account has been created we have sent you a verification email"})
            }
        }
    } 
    catch (error) {
        return res.status(500).json({status:500,msg:error,data:null})
    }
}

const resendOtp = async (req,res)=>{
    try {
        let {userId} = req.body;
        let userInfo = await AdminAccount.findById(userId)
        if(userInfo){
            let otp = Math.floor(Math.random() * 9000) + 1000;
            let validTill=new Date(new Date().setMinutes(new Date().getMinutes() + 5))
            let update = await AdminAccount.findByIdAndUpdate(userId,{otp,otpValidTill:validTill},{$new:true})
            if(update){
                await sendDynamicMail("verification",userInfo?.email,userInfo?.name,otp)
                return res.status(200).json({status:200,data:null,msg:"Otp sent"})
            }
        }
        else{
            return res.status(404).json({status:404,msg:"Invalid user id",data:null})  
        }
    } 
    catch (error) {
        return res.status(500).json({status:500,msg:error,data:null})  
    }
}

const verifyOtp = async (req,res)=>{
    try {
        let {userId,otp} = req.body
        let userInfo = await AdminAccount.findById(userId)
        if(userInfo){
            let compareOtp = userInfo.otp === otp
            if(!compareOtp){
                return res.status(400).json({status:400,msg:"Invalid otp",data:null})  
            }
            else{
                let isExpired = new Date() > new Date(userInfo.otpValidTill);
                if(isExpired){
                    let otp = Math.floor(Math.random() * 9000) + 1000;
                    let validTill=new Date(new Date().setMinutes(new Date().getMinutes() + 5))
                    let update = await AdminAccount.findByIdAndUpdate(userId,{otp,otpValidTill:validTill},{$new:true})
                    await sendDynamicMail("verification",userInfo?.email,userInfo?.name,otp)
                    return res.status(403).json({status:403,msg:"OTP expired new otp has been sent",data:null})  
                }
                else{
                    let update = await AdminAccount.findByIdAndUpdate(userId,{otpVerified:true},{$new:true})
                    return res.status(200).json({status:403,msg:"Account Verified",data:update})  
                }

            }
        }
        else{
            return res.status(404).json({status:404,msg:"Invalid user id",data:null})  
        }

    } 
    catch (error) {
        return res.status(500).json({status:500,msg:error,data:null})  
    }
}

const loginAccount = async(req,res)=>{
    try {
        let {email,password} = req.body
        let findAccount = await AdminAccount.findOne({email:email})
        if(!findAccount){
            return res.status(404).json({msg:"Account not exits",status:404,data:null})
        }
        else{
            if(!findAccount?.otpVerified){
                let otp = Math.floor(Math.random() * 9000) + 1000;
                let validTill=new Date(new Date().setMinutes(new Date().getMinutes() + 5))
                let update = await AdminAccount.findByIdAndUpdate(findAccount?._id,{otp,otpValidTill:validTill},{$new:true})
                await sendDynamicMail("verification",findAccount?.email,findAccount?.name,otp)
                return res.status(403).json({status:403,msg:"Your account is not verified we have sent otp to your email",data:null})  
            }
            else{
                let compare = await bcrypt.compare(password,findAccount?.password)
                if(!compare){
                    return res.status(400).json({status:400,msg:"Invalid credentials",data:null})  
                }
                else{
                    return res.status(200).json({status:200,msg:"Login Successfull",data:findAccount})  
                }
            }
        }
    } 
    catch (error) {
        return res.status(500).json({status:500,msg:error,data:null})  
    }
}


const getUserById = async (req,res)=>{
    try {
        let findAccount = await AdminAccount.findById(req.params.id)
        if(!findAccount){
            return res.status(404).json({msg:"Account not exits",status:404,data:null})
        }
        else{
            return res.status(200).json({status:200,msg:null,data:findAccount})  
        }
    } 
    catch (error) {
        return res.status(500).json({status:500,msg:error,data:null})  
    }
}



module.exports = {createAccount,resendOtp,verifyOtp,loginAccount,getUserById}
