const models = require("../../models");
const jwtUtils = require("../../jwt/jwtUtils");
const bcrypt = require("bcrypt");

module.exports = {
  async authLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await models.User.findOne({ where: { email } });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = jwtUtils.generateToken(user);
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
};
