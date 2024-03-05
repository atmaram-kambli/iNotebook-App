const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "M@l<e 8ome w4ird";

const fetchuser = (req, res, next) => {
    // Get the user from jwt token and add id to the req object
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({ error : "Please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error : "Please authenticate using valid token" });
    }
}

module.exports = fetchuser;