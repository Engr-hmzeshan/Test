const { Category } = require("./models/category");

const categories = require("./data/categories");

require("dotenv").config({ path: "./config.env" });
require("./startup/db")();

const seedCategories = async () => {
  try {
    await Category.deleteMany();
    console.log("Category are deleted");

    await Category.insertMany(categories);
    console.log("All categories are added.");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedCategories();
