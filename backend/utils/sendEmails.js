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
            from: process.env.USER_ACCOUNT,
            to: email,
            subject: subject,
            html: html,
        })
        console.log("email sent sucessfully");
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = sendEmail;