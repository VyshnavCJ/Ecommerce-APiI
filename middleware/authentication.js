const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomErrors.UnauthenticatedError("Authentication Invalid");
  }
  try {
    const payload = isTokenValid({ token });
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    };
    next();
  } catch (error) {
    throw new CustomErrors.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomErrors.UnauthorizedError("Forbidden request");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
