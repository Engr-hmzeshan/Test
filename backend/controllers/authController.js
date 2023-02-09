const { User, validate, validateLogin } = require("../models/auth");
const _ = require("lodash");
const sendEmail = require("../utilities/sendEmail");
const randomString = require("randomstring");

// Signup a user   => /api/v1/user/signup
module.exports.signupUser = async function (req, res, next) {
  const { name, email } = req.body;
  // Validate user request
  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      errMessage: error.message,
    });

  // Check if the user already exists
  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      success: false,
      errMessage: `User with email ${email} already exists`,
    });
  // create a new user
  user = new User({
    name,
    email,
    created_at: new Date().toString(),
  });

  // Generate a random password
  const password = randomString.generate({
    charset: "alphanumeric",
    length: 8,
  });

  // Hashing Password before save to database
  user.password = await user.hashPassword(password);
  user = await user.save();
  // Send email
  sendEmail(user.name, user.email, password);
  // generate JWT
  const token = user.generateAuthToken();
  // send response to client side
  res
    .status(200)
    .header("x-auth-token", token)
    .json({
      success: true,
      message: `An email sent to: ${user.email} successfully for login password.`,
      user: _.pick(user, ["name", "email"]),
    });
};

// Login a user   => /api/v1/user/login
module.exports.loginUser = async function (req, res, next) {
  // Validate login req
  const { error } = validateLogin(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      errMessage: error.message,
    });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      success: false,
      errMessage: "Invalid email or password.",
    });
  // Check the password
  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword)
    return res.status(400).json({
      success: false,
      errMessage: "Invalid email or password.",
    });
  // generate token
  const token = user.generateAuthToken();

  res.status(200).send(token);
};
