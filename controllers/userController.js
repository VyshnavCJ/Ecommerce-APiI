const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");

const getAllUser = async (req, res) => {
  res.send("Get All User");
};
const getSingleUser = async (req, res) => {
  res.send("Get Single User");
};
const showCurrentUser = async (req, res) => {
  res.send("Get Current User");
};
const updateUser = async (req, res) => {
  res.send("Get Update  User");
};
const updateUserPassword = async (req, res) => {
  res.send("Get Update Password User");
};

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
