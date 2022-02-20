const {
    getTasksService,
    getTaskService,
    createTaskService,
    updateTaskDescriptionService,
    updateTaskStateService,
    deleteTaskService
} = require('../services/taskServices')

const getTasks = async(req,res) => {
    try {
        const response = await getTasksService()
        res.json(response)
    } catch (error) {
        throw Error("Error getTasks taskController");
    }
}

const getTask = async(req,res) => {
    try {
        const id = Number(req.params.id)
        const response = await getTaskService(id)
    
        if (response.status === 400) {
          res.status(400).json({ msg: `Task with ID ${id} does not exist` });
        } else {
          res.status(200).json(response.taskCheck);
        }
    } catch (error) {
        throw Error("Error getTask taskController");
    }
}

const createTask = async(req,res) => {
    try {
        const id = Number(req.params.idCat)
        const {description} = req.body
        const response = await createTaskService(id, description);
        if (response.status === 400) {
            res.status(400).json({ msg: `Category with ID ${id} does not exist` });
        } else {
            res.status(201).json(response.newTask);
        }
    } catch (error) {
        throw Error("Error createTask taskController");
    }
}

const updateTaskDescription = async(req,res) => {
    try {
        const id = Number(req.params.id)
        const {description} = req.body
        const response = await updateTaskDescriptionService(id, description);
        if (response.status === 400) {
            res.status(400).json({ msg: `Task with ID ${id} does not exist` });
        } else {
            res.status(201).json(response.taskUpdate);
        }
    } catch (error) {
        throw Error("Error updateTaskDescription taskController");
    }
}

const updateTaskState = async(req,res) => {
    try {
        const id = Number(req.params.id)
        const response = await updateTaskStateService(id);

        if (response.status === 400) {
            res.status(400).json({ msg: `Task with ID ${id} does not exist` });
        } else {
            res.status(401).json(response.taskUpdate);
        }
    } catch (error) {
        throw Error("Error updateTaskState taskController");
    }
}

const deleteTask = async(req,res) => {
    try {
        const id = Number(req.params.id)
        const response = await deleteTaskService(id)

        if (response.status === 400) {
            res.status(400).json({ msg: `Task with ID ${id} does not exist` });
        } else {
            res.status(201).json(response.taskDelete);
        }
    } catch (error) {
        throw Error("Error deleteTask taskController");
    }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTaskDescription,
    updateTaskState,
    deleteTask
}