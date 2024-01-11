const express = require("express");
const authRoute = require("./auth.route");
const docsRoute = require("./docs.route");
const statusRoutes = require("./status.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/docs", docsRoute);
router.use("/status", statusRoutes);

module.exports = router;
