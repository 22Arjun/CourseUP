const { Router } = require('express');
const courseRouter = Router();
const { courseModel } = require('../db');
const { purchaseModel } = require('../db');

courseRouter.post('/course/purchase', (req, res) => {
    
})


courseRouter.get('/course/preview', (req, res) => {

})

module.exports = {
    courseRouter
}