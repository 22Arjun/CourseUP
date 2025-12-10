const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');


app.use(express.json());



app.use(express.static('public'));


app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminRouter);


async function main() {
    await mongoose.connect(MONGO_URI='mongodb+srv://arjun_db_user:UcYLbNPEddGxaSRm@cluster0.ml3fhhi.mongodb.net/CourseUP');
    app.listen(3000);
    console.log('listening on PORT=3000');
}
main();