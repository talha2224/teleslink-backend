const nodeMailer = require("nodemailer");
const { verficationEmailTemplate } = require("./template");

require("dotenv").config()

const getSubject = (emailType) => {
    switch (emailType) {
        case "verification":
            return "TelesLink - Account Verification Email";
        default:
            return "TelesLink - Account Verification Email";
    }
};

const selectTemplate = (emailType, name,otp) => {
    switch (emailType) {
        case "verification":
            return verficationEmailTemplate(name,otp);
        default:
            return verficationEmailTemplate(name,otp);
    }
};

const sendDynamicMail = async (mailType, email, name,otp) => {
    try {
        let transporter = await nodeMailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: process.env.EMAIL_ADMIN, pass: process.env.EMAIL_ADMIN_PASSWORD } });
        let html = await selectTemplate(mailType, name,otp);
        mailOptions = { from: "TelesLink <no-reply@teleslink.com>", to: email, subject: getSubject(mailType), html: html };
        await transporter.sendMail(mailOptions);
        return { status: 200, message: "Email sent successfully", };
    }
    catch (err) {
        console.log("error in sending dynamic email Functions", err)
        return { status: 500, message: err, };
    }
}

module.exports = { sendDynamicMail }