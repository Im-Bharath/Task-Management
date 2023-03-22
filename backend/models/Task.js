const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    description: {type: String, required: true},
    finished: {type: Boolean, required: true}
});

module.exports = mongoose.model("Task", TaskSchema);