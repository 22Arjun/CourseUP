const { Router } = require('express');
const userRouter = Router();

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


})


userRouter.post('/user/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    
})

userRouter.get('/user/purchases', (req, res) => {

})


module.exports = {
    userRouter
}