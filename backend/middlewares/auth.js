const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {
        const req_jwt = req.headers.authorization.split(" ")[1];
        const decoded_id = jwt.verify(req_jwt, "my_secret_key").userId;
        if (req.body.id && req.body.id !== decoded_id)
            throw new Error("Invalid Request!");
        next();
    } catch(err) {
        res.status(400).json({
            error: err.message
        });
    }
};