const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");
const { findById } = require("../models/todo.model");
//   Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const RegisterUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  //   validation
  if (!userName || !password) {
    res.status(400);
    throw new Error("Please all all fields");
  }

  //   check if user exists
  const userExists = await User.findOne({ userName });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  //   create salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await User.create({
    userName,
    password: hashedPassword,
  });

  //   response
  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      token: generateToken(user._id),
    });
  } else {
    res.status(201);
    throw new Error("Invalid user data");
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  //   find a user
  const currentUser = await User.findOne({ userName });

  //   compare password and login
  if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
    res.status(201).json({
      id: currentUser._id,
      userName: currentUser.userName,
      token: generateToken(currentUser._id),
    });
  } else {
    res.status(201);
    throw new Error("Invalid credentials");
  }
});

const GetUser = asyncHandler(async (req, res) => {
  const { _id, userName } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    userName,
  });
});

module.exports = {
  GetUser,
  RegisterUser,
  LoginUser,
};
