const express = require("express");
const router = express.Router();

const controller = require("../delivery/controller");
const authMiddleware = require("../../jwt/authMiddleware");

router.post("/", authMiddleware.authenticateToken, controller.addDelivery);
router.get("/", authMiddleware.authenticateToken, controller.findAll);
router.get("/:id", authMiddleware.authenticateToken, controller.findDelivery);
router.put("/:id", authMiddleware.authenticateToken, controller.updateDelivery);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  controller.deleteDelivery
);

module.exports = router;
