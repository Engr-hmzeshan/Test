const express = require("express");
const router = express.Router();
const {
  addVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
} = require("../controllers/vehicleController");

// Categories Routes  -> Auth middleware todo
router.route("/vehicles").get(getAllVehicles);
router.route("/vehicle/new").post(addVehicle);
router
  .route("/vehicle/:id")
  .get(getVehicleById)
  .put(updateVehicle)
  .delete(deleteVehicle);

module.exports = router;
