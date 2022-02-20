const router = require('express').Router()

const {
    getCategorys,
    getCategoryId,
    createCategory,
    updateCategory,
    deleteCategory,
 } = require('../controllers/categorysController')

router.get("/", getCategorys)
router.get("/:id", getCategoryId)
router.post("/", createCategory)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

module.exports = router