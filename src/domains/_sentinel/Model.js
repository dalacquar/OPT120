const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../db.js");

const sentinel = db.define("sentinel", {
  sentinel_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = sentinel;
