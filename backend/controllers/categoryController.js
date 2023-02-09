const { Category, validate } = require("../models/category");

// Create a category
module.exports.addCategory = async function (req, res) {
  // Validate user request
  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      errMessage: error.message,
    });

  // Check if the category already exists
  let category = await Category.findOne({ name: req.body.name });
  if (category)
    return res.status(400).json({
      success: false,
      errMessage: `category with name ${req.body.name} already exists`,
    });
  // create a new user
  category = new Category({
    name: req.body.name,
  });
  category = await category.save();
  res.status(201).json({
    success: true,
    message: `Category with name ${category} created successfully`,
    category,
  });
};

// Get all categories
module.exports.getAllCategories = async function (req, res) {
  const categories = await Category.find().sort("name");

  res.status(200).json({
    success: true,
    categories,
  });
};
// Get category by id
module.exports.getCategoryById = async function (req, res) {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    success: true,
    category,
  });
};
// Update a category
module.exports.updateCategory = async function (req, res) {
  // Validate
  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      errMessage: error.message,
    });
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!category)
    return res.status(404).json({
      success: false,
      message: "The category with the given ID was not found.",
    });

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
};

// Delete a category
module.exports.deleteCategory = async function (req, res) {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res.status(404).json({
      success: false,
      message: "The category with the given ID was not found.",
    });

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    category,
  });
};
