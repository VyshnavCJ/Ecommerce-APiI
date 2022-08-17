//status codes
const StatusCode = require("http-status-codes");

//errors handlers
const CustomError = require("../errors");

//model
const User = require("../models/user");

const { attachCookieToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);
  attachCookieToResponse({ res, user: tokenUser });

  res.status(StatusCode.OK).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw new CustomError.BadRequestError("Plz provide Email");
  if (!password) throw new CustomError.BadRequestError("Plz provide Password");

  const user = await User.findOne({ email });
  if (!user) throw new CustomError.UnauthenticatedError("Invalid Credentials");
  isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError("Invalid Credentials");

  const tokenUser = createTokenUser(user);
  attachCookieToResponse({ res, user: tokenUser });

  res.status(StatusCode.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCode.OK).json({ msg: "Logged out" });
};

module.exports = { register, login, logout };
