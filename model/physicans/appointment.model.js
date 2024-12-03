const mongoose = require("mongoose")



const appointmentSchema = mongoose.Schema({
    physicanId:{type:mongoose.Schema.Types.ObjectId,ref:"PhysicianAccount",required:true},
    name:{type:String,required:true},
    age:{type:String,required:true},
    gender:{type:String,required:true},
    contactInfo:{type:String,required:true},
    address:{type:String,required:true},
    notes:{type:String,default: null},
    reason:{type:String,required:true},
    instructions:{type:String,default: null},
    days:{type:Array,required:true},
    appointmentDate:{type:String,required:true},
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    urgent:{type:Boolean,default:false},
    ctemsId:{type:mongoose.Schema.Types.ObjectId,ref:"CtemsAccount",required:true},
    status: {type: String,default: "Pending"},
    accepted:{type:Boolean,default:false},
    decline:{type:Boolean,default:false},


})



const Appointment = mongoose.model('Appointment',appointmentSchema,'Appointment')

module.exports = Appointment
