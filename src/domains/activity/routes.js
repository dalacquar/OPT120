const express = require("express");
const router = express.Router();

const authMiddleware = require("../../jwt/authMiddleware");
const controller = require("./controller");

router.post("/", authMiddleware.authenticateToken, controller.addActivity);

router.get("/", authMiddleware.authenticateToken, controller.findAll);
router.get("/:id", authMiddleware.authenticateToken, controller.findActivity);
router.put("/:id", authMiddleware.authenticateToken, controller.updateActivity);

router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  controller.deleteActivity
);

module.exports = router;
