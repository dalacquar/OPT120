const models = require("../../models");

module.exports = {
  async findAll(req, res) {
    try {
      const deliveries = await models.Delivery.findAll();
      res.json(deliveries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findDelivery(req, res) {
    try {
      const delivery = await models.Delivery.findByPk(req.params.id);
      if (!delivery) {
        res.status(404).json({ error: "Delivery not found" });
        return;
      }
      res.json(delivery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addDelivery(req, res) {
    try {
      const newDelivery = await models.Delivery.create({
        userId: req.body.userId,
        activityId: req.body.activityId,
      });
      res.json(newDelivery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateDelivery(req, res) {
    try {
      const [rowsUpdated] = await models.Delivery.update(
        {
          userId: req.body.userId,
          activityId: req.body.activityId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (rowsUpdated === 0) {
        res.status(404).json({ error: "Delivery not found" });
        return;
      }
      const updatedDelivery = await models.Delivery.findByPk(req.params.id);
      res.json(updatedDelivery);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
        res.status(404).json({ error: "Delivery not found" });
        return;
      }
      const deliveries = await models.Delivery.findAll();
      res.json(deliveries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
