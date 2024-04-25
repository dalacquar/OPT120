"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("deliveries", "evaluation", {
      allowNull: true,
      type: Sequelize.DECIMAL,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("deliveries", "evaluation");
  },
};
