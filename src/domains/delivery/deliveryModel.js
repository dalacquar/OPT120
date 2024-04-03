const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../db.js");
const User = require("../user/userModel.js");
const Activity = require("../activity/activityModel.js");

const Delivery = db.define("delivery", {});

// Definição do relacionamento muitos-para-muitos entre User e Activity utilizando Delivery como a tabela intermediária
User.belongsToMany(Activity, { through: Delivery });
Activity.belongsToMany(User, { through: Delivery });

module.exports = Delivery;
