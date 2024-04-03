const models = require("../../models");

module.exports = {
  async findAll(req, res) {
    try {
      const users = await models.User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findUser(req, res) {
    try {
      const user = await models.User.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addUser(req, res) {
    try {
      const newUser = await models.User.create({
        nome: req.body.nome,
        email: req.body.email,
      });
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const [rowsUpdated] = await models.User.update(
        {
          nome: req.body.nome,
          email: req.body.email,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (rowsUpdated === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const updatedUser = await models.User.findByPk(req.params.id);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedRows = await models.User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (deletedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const users = await models.User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
