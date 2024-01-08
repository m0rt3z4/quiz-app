const xhrGlobalOptions = {
  mode: "cors",
  credentials: 'same-origin',
};

const authenticationService = {
  config: {
    baseURL: "http://localhost:3005/v1",
  },
  login: {
    method: "POST",
    url: "/auth/login-service",
  },
  refreshTokens: {
    method: "POST",
    url: "/auth/refresh-tokens",
  },
  authConsumer: {
    method: "POST",
    url: "/services/auth",
  },
  verify: {
    method: "POST",
    url: "/services/auth/verify",
  }
};

module.exports = {
  xhrGlobalOptions,
  authenticationService,
};
