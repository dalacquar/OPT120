const models = require("../../models");
const bcrypt = require("bcrypt");

module.exports = {
  async addActivity(req, res) {
    const { nome, descricao, date_limit } = req.body;
    console.log(nome, descricao, date_limit);

    try {
      const newActivity = await models.Activity.create({
        nome: nome,
        descricao: descricao,
        date_limit: date_limit,
      });
      res.status(201).json(newActivity);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async findAll(req, res) {
    try {
      const activities = await models.Activity.findAll();
      res.json(activities);
    } catch (error) {
      res
        .status(error.ck)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async findActivity(req, res) {
    try {
      const activity = await models.Activity.findByPk(req.params.id);
      if (!activity) {
        return res
          .status(404)
          .json({ error: { code: 404, message: "Activity not found" } });
      }
      res.json(activity);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async updateActivity(req, res) {
    try {
      const { nome, descricao } = req.body;

      const activity = await models.Activity.findByPk(req.params.id);
      if (!activity) {
        return res
          .status(404)
          .json({ error: { code: 404, message: "Activity not found" } });
      }

      // Atualiza apenas os campos fornecidos no corpo da requisição
      if (nome) activity.nome = nome;
      if (descricao) activity.descricao = descricao;

      await activity.save();

      res.json(activity);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
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
        return res
          .status(404)
          .json({ error: { code: 404, message: "Activity not found" } });
      }
      const activities = await models.Activity.findAll();
      res.json(activities);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },
};
