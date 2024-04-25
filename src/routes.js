const express = require("express");
const router = express.Router();

const authRoutes = require("./domains/auth/routes");
const userRoutes = require("./domains/user/routes");
const activityRoutes = require("./domains/activity/routes");
const deliveryRoutes = require("./domains/delivery/routes");


router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/activity", activityRoutes);
router.use("/delivery", deliveryRoutes);

module.exports = router;
