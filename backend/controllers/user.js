const bcrypt = require("bcrypt-nodejs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.logIn = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) 
                return res.status(401).json({
                    error: "User doesn't exist"
                });

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) 
                    return res.status(500).json({
                        error: err
                    });

                if (!result)
                    return res.status(401).json({
                        error: "Incorrect! password"
                    });

                const token = jwt.sign(
                    {userId: user._id},
                    "my_secret_key",
                    {expiresIn: "24h"}
                );
                return res.status(200).json({
                    id: user._id,
                    token: token
                });
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};  

exports.signUp = (req, res, next) => {

    bcrypt.hash(req.body.password, null, null, (err, hash) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        
        const user = new User({
            username: req.body.username,
            password: hash
        });

        user.save()
            .then(() => {
                res.status(201).json({
                    message: "User Added Successfully!"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error
                });
            });
        
    });
};