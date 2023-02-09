const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/categoryController");

// Categories Routes  -> Auth middleware todo
router.route("/categories").get(getAllCategories);
router.route("/category/new").post(addCategory);
router
  .route("/category/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
