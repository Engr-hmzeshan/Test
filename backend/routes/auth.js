const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/authController");

router.route("/user/signup").post(signupUser);
router.route("/user/login").post(loginUser);

module.exports = router;
