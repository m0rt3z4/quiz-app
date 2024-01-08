const logger = require("./logger");
const config = require("./config");
const { ApiHandler } = require("../utils");
const { authenticationService } = require("./externals");
const { rolesMap } = require("./serviceRights");
const miscTypes = require("./consts").miscTypes;
const Misc = require("../services/misc.service");

const { request } = ApiHandler(authenticationService.config);

const login = () =>
  new Promise((resolve, reject) => {
    const body = {
      username: config.service.name,
      password: config.service.password,
    };
    request(authenticationService.login, body)
      .then(async (res) => {
        const { tokens } = res.data;
        logger.info(`${config.service.normalizedName} loggedin Successfully`);
        await Misc.setData(miscTypes.SERVICE_AUTH_DATA, tokens);
        resolve();
      })
      .catch((error) => {
        logger.error(`${config.service.normalizedName} did Not loggedin`);
        console.log(error);
        reject(error);
      });
  });

const verifySelf = async () =>
  new Promise((resolve, reject) => {
    const body = { rolesMap };
    request(authenticationService.verify, body)
      .then(() => {
        logger.info(`${config.service.normalizedName} verified Successfully`);
        resolve();
      })
      .catch((error) => {
        logger.error(
          `${config.service.normalizedName} verified Unsuccessfully`
        );
        reject(error);
      });
  });

const startup = () =>
  new Promise(async (resolve, reject) => {
    try {
      await login();
      await verifySelf();
      resolve();
    } catch (err) {
      reject(err);
    }
  });

module.exports = startup;
