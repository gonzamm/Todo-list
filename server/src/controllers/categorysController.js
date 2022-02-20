const {
  getCategorysService,
  getCategoryIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../services/categoryServices");

const getCategorys = async (req, res) => {
  try {
    const response = await getCategorysService();
    res.json(response);
  } catch (error) {
    throw Error("Error getCategorys categorysController");
  }
};

const getCategoryId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const response = await getCategoryIdService(id);

    if (response.status === 400) {
      res.status(400).json({ msg: `Category with ID ${id} does not exist` });
    } else {
      res.status(200).json(response.categoryCheck);
    }
  } catch (error) {
    throw Error("Error getCategoryId categorysController");
  }
};

const createCategory = async (req, res) => {
  try {
    const { tittle } = req.body;
    const response = await createCategoryService(tittle);
    res.status(201).json(response);
  } catch (error) {
    throw Error("Error createCategory categorysController");
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { tittle } = req.body;
    const response = await updateCategoryService(id, tittle);

    if (response.status === 400) {
      res.status(400).json({ msg: `Category with ID ${id} does not exist` });
    } else {
      res.status(201).json(response.updateCategory);
    }
  } catch (error) {
    throw Error("Error updateCategory categorysController");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const response = await deleteCategoryService(id);
    if (response.status === 400) {
      res.status(400).json({ msg: `Category with ID ${id} does not exist` });
    } else {
      res.status(401).json(response.deleteCategory);
    }
  } catch (error) {
    throw Error("Error deleteCategory categorysController");
  }
};

module.exports = {
  getCategorys,
  getCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
};
