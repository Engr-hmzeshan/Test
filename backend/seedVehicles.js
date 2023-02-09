const { Vehicle } = require("./models/vehicles");

const vehicles = require("./data/vehicles");

require("dotenv").config({ path: "./config.env" });
require("./startup/db")();

const seedVehicles = async () => {
  try {
    await Vehicle.deleteMany();
    console.log("Vehicle are deleted");

    await Vehicle.insertMany(vehicles);
    console.log("All Vehicles are added.");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedVehicles();
