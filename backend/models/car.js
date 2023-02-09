const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;

const carSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
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
    unique: true,
  },
});

const Car = mongoose.model("Car", carSchema);
module.exports.Car = Car;
module.exports.validate = validate;

// Validate
function validate(req) {
  const schema = Joi.object({
    color: Joi.string().required(),
    model: Joi.string().required(),
    make: Joi.string().required(),
    registrationNo: Joi.string().required(),
  });
  return schema.validate(req, {
    abortEarly: false,
  });
}
