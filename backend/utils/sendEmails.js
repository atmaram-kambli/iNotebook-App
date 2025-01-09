require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async(email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.SERVICE,
            port: 587,
            auth: {
                user: process.env.USER_ACCOUNT,
                pass: process.env.PASSWORD,
            }
        })

        await transporter.sendMail({
            from: `iNoteBook - Your notes on the cloud - ${process.env.USER_ACCOUNT}`,
            to: email,
            subject: subject,
            html: html,
        })
        // console.log("Email sent sucessfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error('Error sending email');
    }
}

module.exports = sendEmail;
