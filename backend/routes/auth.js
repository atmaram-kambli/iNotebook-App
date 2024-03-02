const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

router.post('/createuser', 
    body('name').isLength({min: 2}).withMessage('The name must be contained at least 2 characters'),
    body('email').isEmail().withMessage('Not a valid e-mail address'),   //email must be valid
    body('password').isLength({ min: 5 }).withMessage('The password must be contained at least 5 characters'),   // pswd must be min of length 5
    async(req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }
        try {

            let user = await User.findOne({email: req.body.email});
            console.log(user)
            if(user) {
                return res.status(400).json({error:"An user with this email id already exists."});
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: secPass
            }
            user = new User(newUser);
            user.save()
            .then(item => {
                return res.send("User saved to database");
            })
            .catch(err => {
                return res.status(400).send({msg:"Unable to save to database", error:err.message});
            });
        }catch(error) {
            console.log("Some error occured! Unabled to save to the database");
            return res.status(500).json({error: error.message});
        }
   });

module.exports = router;