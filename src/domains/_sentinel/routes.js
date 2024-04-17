const express = require("express");
const router = express.Router();

const controller = require("../_sentinel/controller");

router.get("/", controller.findAll);
router.get("/:id", controller.find);
router.post("/", controller.add);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
