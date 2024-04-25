const express = require("express");
const router = express.Router();

const authMiddleware = require("../../jwt/authMiddleware");
const controller = require("./controller");
const validations = require("./validations");

router.post("/login", controller.authLogin);

module.exports = router;
