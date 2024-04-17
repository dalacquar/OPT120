const jwt = require("jsonwebtoken");

const secretKey = "suaChaveSecreta"; // Coloque uma chave segura aqui

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "3000h",
  });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };
