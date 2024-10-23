const express = require('express');
const User = require('../models/User');
// const Token = require('../models/Token');
const sendEmail = require("../utils/sendEmails");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/forgot-password',
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    async(req, res) => {
        const result = validationResult(req);
        let success = false;
        if (!result.isEmpty()) {
            return res.status(400).json({success, errors: result.array() });
        }
        try {
            const { email } = req.body;
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({success, message:"No User found with given Email ID"});
            }
            const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {expiresIn:"15m"})

            const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
            // const resetLink = `https://inotebook-app-pi.vercel.app/reset-password/${resetToken}`;
            
            
            // This link will redirect user to frontent ResetPassword Page
            const html = `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
            
            // send the email to user
            await sendEmail(email,'Password Reset Request', html);

            res.json({ message: 'Password reset link sent to your email.' });

        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal Server Error!");
        }
})

router.post('/reset-password/:token', async(req, res) => {
    const {token} = req.params;
    const {newPassword} = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'Invalid token or user not found' });

        // hash new password
        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(newPassword, salt);

        user.password = securedPass;
        await user.save();

        res.json({success:true, message: 'Password reset successfully.' });
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error!");
    }
})


module.exports = router;