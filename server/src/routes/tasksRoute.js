const router = require("express").Router()
const {
    getTasks,
    getTask,
    createTask,
    updateTaskDescription,
    updateTaskState,
    deleteTask
} = require ('../controllers/tasksController')

router.get("/", getTasks)
router.get("/:id", getTask)
router.post("/:idCat", createTask)
router.put("/:id", updateTaskDescription)
router.put("/state/:id", updateTaskState)
router.delete("/:id", deleteTask)

module.exports = router