const { createAppointment, getAppointmentByPhysician, getAppointmentByCtems, updateAppointmentStatus, getSingleAppointment, getAllAppointment, toogleInvitation, getAppointmentByCtemsAndDate, getAppointmentByPhysicianAndDate } = require("../../services/physicans/appointment.service")

const router = require("express").Router()



router.post("/create",createAppointment)
router.get("/get-by-physician/:id",getAppointmentByPhysician)
router.get("/get-by-ctems/:id",getAppointmentByCtems)
router.get("/get-by-ctems-date/:id/:date",getAppointmentByCtemsAndDate)
router.get("/get-by-physician-date/:id/:date",getAppointmentByPhysicianAndDate)

router.get("/get-single/:id",getSingleAppointment)
router.get("/get-all-for-admin",getAllAppointment)
router.put("/update-status/:id",updateAppointmentStatus)
router.put("/toogle-invitation/:id",toogleInvitation)




module.exports = router


