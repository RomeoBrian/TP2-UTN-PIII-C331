//requerimos el sequelize
const { Sequelize } = require("sequelize");
//tomamos las constantes de nuestro .env
const env = require('dotenv').config();

/* nombre de la db- user - contraseña - {donde esta alojada, lenguaje, puerto} */
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306
})


module.exports = db