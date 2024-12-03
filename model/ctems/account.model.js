const mongoose = require("mongoose")



const accountSchema = mongoose.Schema({
    
    role:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileImage:{type:String,default:null},
    licenseId:{type:String,required:true},
    phone:{type:Number,required:true},
    address:{type:String,required:true},
    equipments:{type:Array,required:true},
    daysAvailable:{type:Array,required:true},
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    longitude:{type:String,required:true,default:null},
    latitude:{type:String,required:true,default:null},
    otp: {type: Number,default: null},
    otpValidTill: {type: Date,default: null},
    otpVerified: {type: Boolean,default: false},

})



const CtemsAccount = mongoose.model('CtemsAccount',accountSchema,'CtemsAccount')

module.exports =  CtemsAccount