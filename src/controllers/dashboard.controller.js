const httpStatus = require("http-status");
const { ApiResponse, catchAsync, ApiError } = require("../utils");
const { config } = require("../config");
const { responseService } = require("../services");

const submitTestResponse = catchAsync(async (req, res, next) => {
  const body = req.body;
  const responseobj = await responseService.createResponse(body);
  res.send(ApiResponse(httpStatus.OK, "", "", responseobj));
});

const retriveTestData = catchAsync(async (req, res, next) => {
  return true;
});

const getResults = catchAsync(async (req, res, next) => {
  return true;
});

module.exports = {
  submitTestResponse,
  retriveTestData,
  getResults,
};
