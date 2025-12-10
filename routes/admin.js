const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {auth, JWT_SECRET } = require('../auth');

adminRouter.post('/signup', async (req, res ) => {
    const { email, password, firstName, lastName } = req.body;


    try {
        const response = await adminModel.findOne({
        email
    })

    if(!response) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })

        res.json({
            message: "Admin is Logged in"
        })
    }
    else {
        res.status(403).json({
            error: "you already have an account"
        })
    }

    }
    catch {
        res.status(500).json({
            error: "something went wrong"
        })
    }
})

adminRouter.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const response = await adminModel.findOne({
            email
        })

        if(!response) {
            res.status(403).json({
                error: "you haven't signed up yet"
            })
        }
        else {
            const passwordMatch = bcrypt.compare(password, response.password);
            if(passwordMatch) {
                const authentication = jwt.sign(response._id.toString(), JWT_SECRET); 

                res.header('authentication', authentication);
                res.json({
                    authentication
                })
            }
            else {
                res.json({
                    error: "Invalid Password"
                })
            }
        }
    }
    catch {
        res.status(500).json({
            error: "something went wrong"
        })
        
    }
})

adminRouter.post('/course', auth, (req, res) => {

})

adminRouter.put('/course', auth ,(req, res) => {

})

adminRouter.get('/course/bulk', auth, (req, res) => {

})


module.exports = {
    adminRouter: adminRouter
}