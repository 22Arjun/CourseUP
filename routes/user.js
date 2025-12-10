const { Router } = require('express');
const userRouter = Router();
const { userModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth, JWT_SECRET } = require('../auth');
userRouter.post('/signup', async(req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const response = await userModel.findOne({
            email
        })

        if(response) {
            res.status(403).json({
                error: "you already have an account. Please Sign in."
            })
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 12);
            await userModel.create({
                email,
                password: hashedPassword,
                firstName, 
                lastName
            })
        }
    }
    catch {
        res.status(500).json({
            error: "something went wrong"
        })  
    }


})


userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await userModel.findOne({
            email
        })
        
        if(!response) {
            res.status(403).json({
                error: "you haven't signed up yet. Please sign up"
            })
        }
        else {
            const passwordMatch = await bcrypt.compare(password, response.password);

            if(passwordMatch) {
                const authentication = jwt.sign({
                    id: response._id.toString()
                }, JWT_SECRET);

                res.header('authentication', authentication);
                res.json({
                    authentication
                })
            }
            else {
                error: "Invalid password"
            }
        }
    }
    catch(error) {
        res.status(500).json({
            error: "something went wrong"
        })
    }
    
})

userRouter.get('/purchases', auth, (req, res) => {

})


module.exports = {
    userRouter
}