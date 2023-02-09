const { validate, Vehicle } = require("../models/vehicles");

// Create a vehicle
module.exports.addVehicle = async function (req, res) {
  const { registrationNo, category, color, model, make } = req.body;
  // Validate user request
  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      errMessage: error.message,
    });

  // create a new user
  let vehicle = new Vehicle({
    registrationNo,
    category,
    color,
    model,
    make,
  });
  vehicle = await vehicle.save();
  res.status(201).json({
    success: true,
    message: `Vehicle with name ${registrationNo} created successfully`,
    vehicle,
  });
};

// Get all vehicles
module.exports.getAllVehicles = async function (req, res) {
  const vehicles = await Vehicle.find();

  res.status(200).json({
    success: true,
    vehicles,
  });
};
// Get vehicle by id
module.exports.getVehicleById = async function (req, res) {
  const vehicle = await Vehicle.findById(req.params.id);

  res.status(200).json({
    success: true,
    vehicle,
  });
};
// Update a vehicle
module.exports.updateVehicle = async function (req, res) {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      errMessage: error.message,
    });
  const vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    {
      registrationNo: req.body.registrationNo,
      category: req.body.category,
      color: req.body.color,
      model: req.body.model,
      make: req.body.make,
    },
    {
      new: true,
    }
  );

  if (!vehicle)
    return res.status(404).json({
      success: false,
      message: "The vehicle with the given ID was not found.",
    });

  res.status(200).json({
    success: true,
    message: "Vehicle updated successfully",
    vehicle,
  });
};

// Delete a vehicle
module.exports.deleteVehicle = async function (req, res) {
  const vehicle = await Vehicle.findByIdAndRemove(req.params.id);

  if (!vehicle)
    return res.status(404).json({
      success: false,
      message: "The vehicle with the given ID was not found.",
    });

  res.status(200).json({
    success: true,
    message: "Vehicle deleted successfully",
    vehicle,
  });
};
