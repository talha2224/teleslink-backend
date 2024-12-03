const mongoose = require("mongoose")



const accountSchema = mongoose.Schema({
    
    role:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    address:{type:String,required:true},
    multiFactor:{type:Boolean,default:false},
    accessLevel:{type:String,required:true},
    thresholdSystemAlert:{type:String,required:true},
    notificationMethod:{type:String,required:true},

    otp: {type: Number,default: null},
    otpValidTill: {type: Date,default: null},
    otpVerified: {type: Boolean,default: false},

})



const AdminAccount = mongoose.model('AdminAccount',accountSchema,'AdminAccount')

module.exports =  AdminAccount