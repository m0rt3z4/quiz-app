const httpStatus = require("http-status");
const { ApiResponse, catchAsync, ApiError } = require("../utils");
const { config } = require("../config");
const { responseService } = require("../services");

const registerUser = catchAsync(async (req, res, next) => {
  return true;
});

const loginUser = catchAsync(async (req, res, next) => {
  return true;
});

const validateEmail = catchAsync(async (req, res, next) => {
  return true;
});

module.exports = {
  registerUser,
  loginUser,
  validateEmail,
};
