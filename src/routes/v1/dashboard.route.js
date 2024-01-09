const express = require("express");
const httpStatus = require("http-status");
const dashboardController = require('../../controllers/dashboard.controller')

const router = express.Router();

router.route("/").get((req, res) => res.sendStatus(httpStatus.OK));
router.route("/submit").get(dashboardController.submitTestResponse);


module.exports = router;
