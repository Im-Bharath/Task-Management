const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");

mongoose.connect("mongodb+srv://ioli:6dygev2Wqu6t8j4B@sellmystuffatlascluster-yre1n.mongodb.net/test?retryWrites=true")
        .then(() => {
            console.log("successfully connected to the MongoDB Atlas!");
        })
        .catch((error) => {
            console.log("Unable to connect to the MongoDB Atlas!");
            console.error(error);
        });


const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);



module.exports = app;