const router = require("express").Router();
const taskController = require("../controllers/task");
const auth = require("../middlewares/auth");

router.get("/", auth, taskController.getTasks);
router.post("/", auth, taskController.newTask);
router.put("/:id", auth, taskController.editTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;