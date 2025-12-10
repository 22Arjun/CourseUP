const jwt = require('jsonwebtoken');
const JWT_SECRET = "yesIamtheonewhoknocks";

const auth = async (req, res, next) => {
    const authentication = req.headers.authentication;

    const decodedId = jwt.verify(authentication, JWT_SECRET);

    if(decodedId.id) {
        req.id = decodedId;
        next();
    }
    else {
        res.status(403).json({
            error: "you are not permitted to use any of those facilities(you're not signed in)"
        })
    }
}

module.exports = {
    JWT_SECRET,
    auth
}