# OPT120 - BACKEND NODEJS - EXPRESS - SEQUELIZE

Projeto da discplina de programação móvel OPT120.

## Pré-requisitos

Banco de dados Mysql.
NodeJs v18.16.0

## Instalação e configuração do ambiente de densenvolvimento local:

### Instalação das dependências do projeto

Antes de configurar sua máquina localmente garanta que todos os pré-requisitos acima estejam instalados corretamente.

Primeiro passo é utilizar o comando `npm install` para instalar as dependências do projeto.

### Configurando váriaveis locais de desenvolvimento

Após isso vamos criar um novo arquivo `.env` na raiz do projeto e colocar no arquivo o que está no arquivo `.envexample`. Após isso mude os valores das váriaveis de ambiente com os dados do seu banco de dados local.

Também será necessário configurar o arquivo `/config/config.json` com as informações do banco de dados para execução do projeto.

### Rodando as migrações para criações de tabelas nos bancos de dados.

Após a instalação e configuração do ambiente iremos rodar as migrations para que as tabelas no banco de dados sejam criadas. Para rodar as migrations basta utilizar o comando `sequelize db:migrate`.

Para reverter as migrations e excluir as tabelas basta utilizar o comando: `sequelize db:migrate:undo`.

Para um número X de migrations basta utilizar o comando: `sequelize db:migrate:undo --step 3`. Isso irá reverter apenas as últimas 3 migrations executadas.

Para criar novas migrations basta utilizar o comando sequelize `migration:generate --name nome_migration`.

### Iniciando servidor de desenvolvimento.

Para rodar o sevidor backend e realizar a conexão com banco de dados iremos utilizar o comando: `npm run dev`

## Uso

Para realizar as requisições HTTP é possível utilizar a qualquer ferramenta, para testes estou utulizando o Programa Insomnia. Para as requisições prontas estou deixando os arquivos de importação do Insomnia para os modelos das rotas.

## Estrutura do Projeto

### Arquivos de configuração e Raiz do projeto

Na raiz estão os arquivos básicos de configuração. O arquivo principal é o `server.js`, que é o responsável pela conexão com banco de dados a partir dos dados vindos do arquivo `.env` e rodar o servidor.

A pasta `/config` possui o arquivo de configuração da base de dados para realizar as migrações.
As migrações de fato, estão disponíveis na pasta migrations na raiz, onde estão todos os arquivos de migrações.
As seeders ainda não foram implementadas mas caso sejam há pasta de `seeders`.

### Arquivos de densenvolvimento

O desenvolvimento do projeto ocorre todo dentro da pasta `src` dentro dela há os arquivos de configuração do sequelize, `db.js`.

No arquivo `models.js` ocorre a importação de todos os modelos do sistema. Isso centraliza todos os modelos em um único arquivo, o que facilita a importação e utilização dos modelos dentro dos controllers.

O arquivo `routes.js` tem o mesmo intuito que o models.js, centralizar a importação das rotas e permitir a divisão das rotas em diferentes dominíos para melhor organização.

#### Pasta Domains

Dentro da pasta domains divide os dominios de cada entidade do banco de dados. Todas as pastas de domains representam uma entidade do banco de dados e possuem 3 arquivos a principio.

- routes.js
- controller.js
- entidadeModel.js

O arquivo `entidadeModel.js` representa o modelo da entidade para o sequelize.

O arquivo `routes.js` exporta as rotas disponíveis no dominío e chama as funções disponíveis nos controllers.

O arquivo `controller.js` exporta as funções disponíveis de cada entidade.

Um novo arquivo já está no planejamento do projeto que é um arquivo de `validations.js`, o objetivo do arquivo é realizar a validação dos atributos vindos no corpo da requisição para que as requisições venham na estrutura esperada e evitar o crash da aplicação e a utilização de possíveis vulnerabilidades do sistema.
