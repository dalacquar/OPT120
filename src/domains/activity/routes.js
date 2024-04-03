const express = require("express");
const router = express.Router();

const controller = require("../activity/controller");

router.get("/", controller.findAll);
router.get("/:id", controller.findActivity);
router.post("/", controller.addActivity);
router.put("/:id", controller.updateActivity);
router.delete("/:id", controller.deleteActivity);

module.exports = router;
