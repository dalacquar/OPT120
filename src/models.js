// src/models.js

const sequelize = require("./db.js");

// Importe todos os modelos aqui
const User = require("./domains/user/userModel.js");
const Activity = require("./domains/activity/activityModel.js");
const Delivery = require("./domains/delivery/deliveryModel.js");

module.exports = {
  User,
  Delivery,
  Activity,
};
