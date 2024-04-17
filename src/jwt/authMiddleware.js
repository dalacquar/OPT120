const jwtUtils = require("./jwtUtils");

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    const user = await jwtUtils.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
}

module.exports = { authenticateToken };
