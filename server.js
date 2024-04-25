const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/db.js");
const cors = require("cors");
const routes = require("./src/routes.js"); // Importe as rotas definidas em routes.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Middleware para iniciar a transação antes de cada requisição
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}\nIniciando a transação`);
  sequelize
    .transaction()
    .then((transaction) => {
      req.transaction = transaction;
      next();
    })
    .catch((error) => {
      console.error("Erro ao iniciar a transação:", error);
      res.status(500).send("Erro interno do servidor");
    });
});

// Middleware para concluir a transação após cada requisição
app.use((req, res, next) => {
  req.transaction
    .commit()
    .then(() => {
      console.log(`Transação concluída`);
      next();
    })
    .catch((error) => {
      console.error("Erro ao concluir a transação:", error);
      req.transaction.rollback();
      res.status(500).send("Erro interno do servidor");
    });
});

// Adicione as rotas ao aplicativo Express
app.use(routes);

// Inicie o servidor e a conexão com o banco de dados
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
