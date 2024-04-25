const models = require("../../models");
const bcrypt = require("bcrypt");

module.exports = {
  async addDelivery(req, res) {
    const { activityId, userId, evaluation } = req.body;

    try {
      const newDelivery = await models.Delivery.create({
        evaluation: evaluation,
        activityId: activityId,
        userId: userId,
      });
      res.status(201).json(newDelivery);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async findAll(req, res) {
    try {
      const deliveries = await models.Delivery.findAll();
      res.json(deliveries);
    } catch (error) {
      res
        .status(error.ck)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async findDelivery(req, res) {
    try {
      const delivery = await models.Delivery.findByPk(req.params.id);
      if (!delivery) {
        return res
          .status(404)
          .json({ error: { code: 404, message: "Delivery not found" } });
      }
      res.json(delivery);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async updateDelivery(req, res) {
    try {
      const delivery = await models.Delivery.findByPk(req.params.id);
      if (!delivery) {
        return res
          .status(404)
          .json({ error: { code: 404, message: "Delivery not found" } });
      }

      await delivery.save();

      res.json(delivery);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async deleteDelivery(req, res) {
    try {
      const deletedRows = await models.Delivery.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (deletedRows === 0) {
        return res
          .status(404)
          .json({ error: { code: 404, message: "Delivery not found" } });
      }
      const deliveries = await models.Delivery.findAll();
      res.json(deliveries);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },
};
