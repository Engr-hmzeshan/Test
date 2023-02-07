const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { Schema } = mongoose;

// Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: Date,
});
userSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, +process.env.SALT_ROUND);
};
// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// Exports
module.exports.User = User;
module.exports.validate = validateUser;
module.exports.validateLogin = validateLogin;

// Handlers
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(user, {
    abortEarly: false,
  });
}
function validateLogin(req) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(req, {
    abortEarly: false,
  });
}
