const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    console.log("userName: ", userName, password, email);
    if (!userName || !password || !email) {
      return res.status(500).send({
        success: false,
        message: "Please fill User name, email and password fields ",
      });
    }
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await userModel.create({
      email,
      userName,
      password,
    });
    res.status(200).send({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register Controller API ",
      error: error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please fill email and password fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = JWT.sign(
      { id: user._id },
      process.env.JSON_WEB_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    user.password = undefined;
    res.status(200).send({
      sucess: true,
      message: "Login success",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login Controller",
      error,
    });
  }
};

module.exports = { registerController, loginController };
