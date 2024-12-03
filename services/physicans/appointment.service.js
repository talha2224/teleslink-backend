const Appointment = require("../../model/physicans/appointment.model");



const createAppointment = async (req,res)=>{
    try {
        let {physicanId,name,age,gender,contactInfo,address,notes,reason,instructions,days,startTime,endTime,urgent,ctemsId,appointmentDate} = req.body

        let create = await Appointment.create({physicanId,name,age,gender,contactInfo,address,notes,reason,instructions,days,startTime,endTime,urgent,ctemsId,appointmentDate})
        return res.status(200).json({msg:"Ctems Visit Created",status:200,data:create})
    } 
    catch (error) {
        console.log(error)
    }
}


const getAppointmentByPhysician=async(req,res)=>{
    try {
        let data = await Appointment.find({physicanId:req.params.id}).populate("ctemsId").populate("physicanId")
        return res.status(200).json({msg:null,status:200,data:data})
    } 
    catch (error) {
        console.log(error)
    }
}

const getAppointmentByCtems=async(req,res)=>{
    try {
        let data = await Appointment.find({ctemsId:req.params.id}).populate("ctemsId").populate("physicanId")
        return res.status(200).json({msg:null,status:200,data:data})
    } 
    catch (error) {
        console.log(error)
    }
}

const updateAppointmentStatus=async(req,res)=>{
    try {
        let updateData = await Appointment.findByIdAndUpdate(req.params.id,{status:req.body.status},{$new:true})
        return res.status(200).json({msg:null,status:200,data:updateData})
    } 
    catch (error) {
        console.log(error)
    }
}

const toogleInvitation=async(req,res)=>{
    try {
        if(req.body.accepted){
            let updateData = await Appointment.findByIdAndUpdate(req.params.id,{accepted:true},{$new:true})
            return res.status(200).json({msg:null,status:200,data:updateData})
        }
        else{
            let updateData = await Appointment.findByIdAndUpdate(req.params.id,{decline:true},{$new:true})
            return res.status(200).json({msg:"Inviation Decline By Cterms",status:200,data:updateData}) 
        }
    } 
    catch (error) {
        console.log(error)
    }
}

const getSingleAppointment=async(req,res)=>{
    try {
        let data = await Appointment.findById(req.params.id).populate("ctemsId").populate("physicanId")
        return res.status(200).json({msg:null,status:200,data:data})
    } 
    catch (error) {
        console.log(error)
    }
}

const getAllAppointment = async (req,res)=>{
    try {
        let data = await Appointment.find({}).populate("ctemsId").populate("physicanId")
        return res.status(200).json({msg:null,status:200,data:data})
    } 
    catch (error) {
        console.log(error)
    }
}

const getAppointmentByCtemsAndDate=async(req,res)=>{
    try {
        let data = await Appointment.find({ctemsId:req.params.id,appointmentDate:req.params.date}).populate("ctemsId").populate("physicanId")
        return res.status(200).json({msg:null,status:200,data:data})
    } 
    catch (error) {
        console.log(error)
    }
}

const getAppointmentByPhysicianAndDate=async(req,res)=>{
    try {
        let data = await Appointment.find({physicanId:req.params.id,appointmentDate:req.params.date}).populate("ctemsId").populate("physicanId")
        return res.status(200).json({msg:null,status:200,data:data})
    } 
    catch (error) {
        console.log(error)
    }
}



module.exports={createAppointment,getAppointmentByCtems,getAppointmentByPhysician,updateAppointmentStatus,getSingleAppointment,getAllAppointment,toogleInvitation,getAppointmentByCtemsAndDate,getAppointmentByPhysicianAndDate}
