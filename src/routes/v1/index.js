const express = require('express');
const docsRoute = require('./docs.route');
const statusRoutes = require("./status.route");

const router = express.Router();

router.use('/docs', docsRoute);
router.use("/status", statusRoutes);

module.exports = router;
