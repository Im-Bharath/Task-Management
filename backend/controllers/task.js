const Task = require("../models/Task");

exports.newTask = (req, res, next) => {
    console.log(req.body);
    const task = new Task({
        description: req.body.description,
        finished: req.body.finished
    });
    task.save(err => {
        if (err) {
            console.log(task);
            console.error("Task couldn't be saved");
            return res.status(401).json({
                error: err + "\nCouldn't add task to database"
            });
        }
        res.status(201).json({
            message: "Task created successfully",
            id: task._id
        })
    });
};

exports.editTask = (req, res, next) => {
    console.log("editing task with id: " + req.params.id );

    Task.findOne({_id: req.params.id})
        .then((prevItem) => {
            
            Task.updateOne({_id: req.params.id}, {
                description: req.body.description == undefined ? prevItem.description: req.body.description,
                finished: req.body.finished == undefined ? prevItem.finished: req.body.finished
            }).then(() => {
                res.status(201).json({message: "Task update successful"});
            }).catch(err => {
                res.status(401).json({error: "Update failed /n" + err});
            });
        }).catch(err => {
            res.status(404).json({error: err});
        });

};

exports.deleteTask = (req, res, next) => {
    console.log("deleting task with id: " + req.params.id);
    Task.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({message: "Task deleted successfully!"});
        })
        .catch(err => res.status(404).json({error: err}));
};

exports.getTasks = (req, res, next) => {
    console.log("getting tasks from database");
    Task.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.error("couldn't get data from database");
            res.status(404).json({
                error: err + "\ncouldn't find the tasks"
            });
        })
};

