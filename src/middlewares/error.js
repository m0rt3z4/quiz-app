const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const code = error.code || httpStatus.INTERNAL_SERVER_ERROR;
		const statusCode = error.statusCode || httpStatus[`${code}_NAME`];
		const message = error.message || statusCode;
		error = new ApiError(code, statusCode, message, false, err.stack);
	}
	next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	let { code, statusCode, message, textId } = err;
	if (config.env === 'production' && !err.isOperational) {
		code = code || httpStatus.INTERNAL_SERVER_ERROR;
		statusCode = statusCode || httpStatus['500_NAME'];
		message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
		textId = textId || 'messages.error.internalServerError';
	}

	res.locals.errorMessage = err.message;

	const response = {
		code,
		statusCode: statusCode || httpStatus[`${code}_NAME`],
		message,
		textId,
		...(config.env === 'development' && { stack: err.stack }),
	};

	if (config.env === 'development') {
		logger.error(err);
	}

	res.status(code).send(response);
};

module.exports = {
	errorConverter,
	errorHandler,
};
