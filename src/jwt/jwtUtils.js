const jwt = require("jsonwebtoken");
const models = require("../models");
const secretKey = "suaChaveSecreta"; // Coloque uma chave segura aqui

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "3000h",
  });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

async function getUserFromToken(token) {
  try {
    const decodedToken = verifyToken(token);
    const userId = decodedToken.id;

    const user = await models.User.findByPk(userId);

    if (!user.dataValues) {
      throw new Error("Usuário não encontrado");
    }

    return user.dataValues;
  } catch (error) {
    console.error("Erro ao obter usuário do token:", error);
    throw new Error("Erro ao obter usuário do token");
  }
}

module.exports = { generateToken, verifyToken, getUserFromToken };
