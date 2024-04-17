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

  async find(req, res) {
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

  async add(req, res) {
    try {
      res.json(newActivity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      res.json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      res.json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
