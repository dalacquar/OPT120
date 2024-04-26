const { getUserFromToken } = require("../../jwt/jwtUtils");
const models = require("../../models");
const bcrypt = require("bcrypt");

module.exports = {
  async addDelivery(req, res) {
    const { activityId, evaluation } = req.body;

    console.log(evaluation);

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        error: { code: 401, message: "Token de autenticação não fornecido" },
      });
    }

    const user = await getUserFromToken(authHeader.split(" ")[1]);

    try {
      const newDelivery = await models.Delivery.create({
        evaluation: evaluation,
        activityId: activityId,
        userId: user.id,
      });
      res.status(201).json(newDelivery);
    } catch (error) {
      console.log(error);
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
