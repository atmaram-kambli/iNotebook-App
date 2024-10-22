const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config()

// Route 1: Sign up endpoint
router.post('/createuser', 
    body('name').isLength({min: 2}).withMessage('The name must be contained at least 2 characters'),
    body('email').isEmail().withMessage('Not a valid e-mail address'),   //email must be valid
    body('password').isLength({ min: 4 }).withMessage('The password must be contained at least 4 characters'),   // pswd must be min of length 5
    async(req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const result = validationResult(req);
        let success = false;
        if (!result.isEmpty()) {
            return res.status(400).json({success, errors: result.array() });
        }
        try {

            let user = await User.findOne({email: req.body.email});
            if(user) {
                return res.status(400).json({success, error:"An user with this email id already exists."});
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
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY)
                success = true;
                return res.json({success, authToken});
            })
            .catch(err => {
                return res.status(400).json({msg:"Unable to save to database", error:err.message});
            });
        }catch(error) {
            console.log(error.message);
            return res.status(500).json({error: "Internsl Server Error"});
        }
   });



// Route 2: log in endpoint
router.post('/login', 
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password').exists().withMessage('The password must not be empty'),
    async(req, res) => {
        const result = validationResult(req);
        let success = false;
        if (!result.isEmpty()) {
            return res.status(400).json({success, errors: result.array() });
        }
        try {
            let user = await User.findOne({email: req.body.email});
            if(!user) {
                return res.status(400).json({success, error:"Invalid creadentials"});
            }
            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if(!passwordCompare) {
                return res.status(400).json({success, error:"Invalid creadentials"});
            }
            const data = {
                user: {
                    id: user.id,
                    username: user.name,
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY)
            success = true;

            return res.json({success, authToken});
            
        }catch(error) {
            console.log(error.message);
            return res.status(500).json({error: "Internsl Server Error"});
        }
   });


// Route 3: Get user details, login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password") 
        res.send(user);
        // res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error");
    }
})



module.exports = router;