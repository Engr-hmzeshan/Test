const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
const Category = mongoose.model("Category", categorySchema);
module.exports.Category = Category;
module.exports.validate = validate;

function validate(req) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(req);
}
