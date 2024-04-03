const models = require("../../models");

module.exports = {
  async findAll(req, res) {
    try {
      const activities = await models.Activity.findAll();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findActivity(req, res) {
    try {
      const activity = await models.Activity.findByPk(req.params.id);
      if (!activity) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addActivity(req, res) {
    try {
      const newActivity = await models.Activity.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
      });
      res.json(newActivity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateActivity(req, res) {
    try {
      const [rowsUpdated] = await models.Activity.update(
        {
          nome: req.body.nome,
          descricao: req.body.descricao,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (rowsUpdated === 0) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }
      const updatedActivity = await models.Activity.findByPk(req.params.id);
      res.json(updatedActivity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteActivity(req, res) {
    try {
      const deletedRows = await models.Activity.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (deletedRows === 0) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }
      const activities = await models.Activity.findAll();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
