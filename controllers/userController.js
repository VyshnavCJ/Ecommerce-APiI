const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const User = require("../models/user");
const {
  createTokenUser,
  attachCookieToResponse,
  checkPermission,
} = require("../utils");

const getAllUser = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user)
    throw new CustomErrors.NotFoundError(`No user with id : ${req.params.id}`);
  checkPermission(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomErrors.BadRequestError("Plz provide both values");
  }
  const user = await User.findById(req.user.userId);
  user.email = email;
  user.name = name;
  await user.save();
  const tokenUser = createTokenUser(user);
  attachCookieToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomErrors.BadRequestError("Plz provide both values");
  }
  const user = await User.findById(req.user.userId);
  // if (!user) {
  //   throw new CustomErrors.UnauthenticatedError("User not found");
  // }
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomErrors.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated" });
};

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
