const express = require("express");
const router = express.Router();

// Data for categories and cars
let categories = [
  { id: 1, name: "Bus" },
  { id: 2, name: "Sedan" },
  { id: 3, name: "SUV" },
  { id: 4, name: "Hatchback" },
];

let cars = [
  {
    id: 1,
    categoryId: 1,
    color: "Red",
    model: "XYZ",
    make: "ABC",
    registrationNumber: "1234",
  },
  {
    id: 2,
    categoryId: 2,
    color: "Blue",
    model: "PQR",
    make: "DEF",
    registrationNumber: "5678",
  },
];

// Get all categories
router.get("/categories", (req, res) => {
  res.json(categories);
});

// Get a specific category
router.get("/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  res.json(category);
});

// Add a new category
router.post("/categories", (req, res) => {
  const category = {
    id: categories.length + 1,
    name: req.body.name,
  };
  categories.push(category);
  res.json(category);
});

// Update a category
router.put("/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  category.name = req.body.name;
  res.json(category);
});

// Delete a category
router.delete("/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  const index = categories.indexOf(category);
  categories.splice(index, 1);
  res.json(category);
});

// Get all cars
router.get("/cars", (req, res) => {
  res.json(cars);
});

// Get a specific car
router.get("/cars/:id", (req, res) => {
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car)
    return res.status(404).send("The car with the given ID was not found.");
  res.json(car);
});

// Add a new car
