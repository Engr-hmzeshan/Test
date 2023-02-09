const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model("Vehicles", vehicleSchema);
module.exports.Vehicle = Vehicle;
module.exports.validate = validate;

// Validate
function validate(req) {
  const schema = Joi.object({
    category: Joi.string().required(),
    color: Joi.string().required(),
    model: Joi.string().required(),
    make: Joi.string().required(),
    registrationNo: Joi.string().required(),
  });
  return schema.validate(req, {
    abortEarly: false,
  });
}
