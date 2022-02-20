const {PrismaClient} = require('@prisma/client')
const {category} = new PrismaClient()


const getCategorysService = async () =>{
    const categorys = await category.findMany({
        select: {tittle:true, id: true}
    })
    return categorys
}

const getCategoryIdService = async (id) =>{
    const categoryCheck = await category.findUnique({
        select:{tittle:true, tasks:true},
        where:{id}
    })
    
    if (!categoryCheck){
        return { status: 400 }
    }

    return {status:200, categoryCheck}
    
}

const createCategoryService = async (tittle) =>{
    
    const newCategory = await category.create({
        data:{tittle},
        select:{tittle: true}
    })
    return newCategory
}

const updateCategoryService = async (id, tittle) =>{
    const categoryCheck = await category.findUnique({
        select:{tittle:true},
        where:{id}
    })
    
    if (!categoryCheck){
        return { status: 400 }
    }

    const updateCategory = await category.update({
        where:{id},
        data:{tittle},
        select:{tittle:true}
    })
    return {status: 201, updateCategory}

}

const deleteCategoryService = async (id) =>{
    const categoryCheck = await category.findUnique({
        select:{tittle:true},
        where:{id}
    })
    
    if (!categoryCheck){
        return { status: 400 }
    }

    const deleteCategory = await category.delete({
        where:{id},
        select:{tittle:true}
    })

    return {status:401, deleteCategory}
}

module.exports = {
    getCategorysService,
    getCategoryIdService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
}