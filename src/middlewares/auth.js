const { ExtractJwt } = require("passport-jwt");
const { ApiHandler } = require("../utils");
const { authenticationService } = require("../config/externals");

const { request } = ApiHandler(authenticationService.config);

const auth = (...requiredRights) => async (req, res, next) => {
  const authReq = {
    requiredRights,
    consumerAccessToken: ExtractJwt.fromAuthHeaderAsBearerToken()(req),
    userIdParam: req.params.userId,
  };
  request(authenticationService.authConsumer, authReq)
    .then(() => next())
    .catch((error) => res.status(error.code).send(error));
};

module.exports = auth;
