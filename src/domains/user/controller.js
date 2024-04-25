const models = require("../../models");
const bcrypt = require("bcrypt");

module.exports = {
  async addUser(req, res) {
    const { name, email, phone, password } = req.body;
    console.log("entrou")
    console.log(name, email, password)

    try {
      console.log("entro no try")
      const userFound = await models.User.findOne({ where: { email: email } });
      console.log("tento pega o user")
      if (userFound) {
        return res
          .status(400)
          .json({ error: { code: 400, message: "User already exists" } });
      }
      console.log("nao acho user")

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await models.User.create({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async findAll(req, res) {
    try {
      const users = await models.User.findAll();
      res.json(users);
    } catch (error) {
      res
        .status(error.ck)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async findUser(req, res) {
    try {
      const user = await models.User.findByPk(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ error: { code: 404, message: "User not found" } });
      }
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },

  async updateUser(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      console.log(req.params);

      const user = await models.User.findByPk(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ error: { code: 404, message: "User not found" } });
      }

      // Atualiza apenas os campos fornecidos no corpo da requisição
      if (name) user.name = name;
      if (email) user.email = email;
      if (phone) user.phone = phone;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      await user.save();

      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
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
        return res
          .status(404)
          .json({ error: { code: 404, message: "User not found" } });
      }
      const users = await models.User.findAll();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Internal server error" } });
    }
  },
};
