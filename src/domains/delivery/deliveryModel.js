const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../db.js");
const User = require("../user/userModel.js");
const Activity = require("../activity/activityModel.js");

const Delivery = db.define("deliveries", {
  evaluation: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

Delivery.belongsTo(User, { foreignKey: "userId" });
Delivery.belongsTo(Activity, { foreignKey: "activityId" });

module.exports = Delivery;
