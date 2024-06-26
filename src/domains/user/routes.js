const express = require("express");
const router = express.Router();

const authMiddleware = require("../../jwt/authMiddleware");
const controller = require("./controller");
const validations = require("./validations");

router.post("/", controller.addUser);

router.get("/", authMiddleware.authenticateToken, controller.findAll);
router.get("/:id", authMiddleware.authenticateToken, controller.findUser);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  controller.updateUser
);
router.delete("/:id", authMiddleware.authenticateToken, controller.deleteUser);

module.exports = router;
