const express = require("express");
const router = express.Router();

const controller = require("../delivery/controller");

router.get("/", controller.findAll);
router.get("/:id", controller.findDelivery);
router.post("/", controller.addDelivery);
router.put("/:id", controller.updateDelivery);
router.delete("/:id", controller.deleteDelivery);

module.exports = router;
