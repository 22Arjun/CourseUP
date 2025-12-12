const { Router } = require('express');
const courseRouter = Router();
const { courseModel } = require('../db');
const { purchaseModel } = require('../db');
const { userAuth } = require('../middlewares/user-auth')

courseRouter.post('/purchase', userAuth, async (req, res) => {
    const userId = req.id;
    const courseId = req.body.courseId;

    try {
        await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: "You have purchased the course successfully"
    })
    }
    catch(error) {
        res.status(500).json({
            error_message: "someting went wrong"
        })
    }
})  


courseRouter.get('/preview', async (req, res) => {
    try {
        await courseModel.find({});
        res.json({
            message: "all courses are fetched successfully"
        })
    }
    catch(error) {
        res.status(500).json({
            error_message: "something went wrong"
        })
    }
})

module.exports = {
    courseRouter
}