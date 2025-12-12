const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');

const adminAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;

    const decodedId = jwt.verify(authorization, JWT_ADMIN_PASSWORD);

    if(decodedId.id) {
        req.id = decodedId.id;
        next();
    }
    else {
        res.status(403).json({
            error: "you are not permitted to use any of those facilities(you're not signed in)"
        })
    }
}

module.exports = {
    adminAuth
}