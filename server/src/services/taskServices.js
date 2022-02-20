const {PrismaClient} = require('@prisma/client')
const {task} = new PrismaClient()
const {category} = new PrismaClient()

const getTasksService = async () => {
    const tasks = await task.findMany({
        select: {id:true, description: true, category:true, state: true}
    })
    return tasks
};

const getTaskService = async (id) => {
    const taskCheck = await task.findUnique({
        select:{description:true, id:true, state:true},
        where:{id}
    })
    
    if (!taskCheck){
        return { status: 400 }
    }

    return {status:200, taskCheck}
};

const createTaskService = async (id, description) => {
    const categoryCheck = await category.findUnique({
        select:{tittle:true},
        where:{id}
    })
    
    if (!categoryCheck){
        return { status: 400}
    }

    const newTask = await task.create({
        data:{description, state: false, category_id: id},
        select:{description:true, state:true, category_id: true}
    })
    return {status: 201, newTask}
};

const updateTaskDescriptionService = async (id, description) => {
    const taskCheck = await task.findUnique({
        select:{description:true},
        where:{id}
    })
    
    if (!taskCheck){
        return { status: 400}
    }

    const taskUpdate = await task.update({
        where:{id},
        data:{description},
        select:{description:true, id:true}
    })

    return {status: 201, taskUpdate}
};

const updateTaskStateService = async (id) => {
    const taskCheck = await task.findUnique({
        select:{description:true, state:true},
        where:{id}
    })
    
    if (!taskCheck){
        return { status: 400 }
    }

    const stateMod = !taskCheck.state
    const taskUpdate = await task.update({
        where:{id},
        data:{state: stateMod},
        select:{description:true, id:true, state:true}
    })

    return {status: 201, taskUpdate}
};

const deleteTaskService = async (id) => {
    const taskCheck = await task.findUnique({
        select:{description:true, state:true},
        where:{id}
    })
    
    if (!taskCheck){
        return { status: 400 }
    }

    const taskDelete = await task.delete({
        where:{id},
        select:{description:true}
    })
    return {status:401, taskDelete}
};

module.exports = {
    getTasksService,
    getTaskService,
    createTaskService,
    updateTaskDescriptionService,
    updateTaskStateService,
    deleteTaskService
}