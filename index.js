const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


})


app.listen(3000);