/* importar la base de datos */
const db = require("../data/db.js")
    // requerimos el FataType de sequelize
const { DataTypes } = require("sequelize");

/* nombre de la tabla y defina sus columnas y tipos de datos */

const variacionesModel = db.define("variaciones", {
    nombreVariacion: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("Active", "Inactive") },
    afinidad: { type: DataTypes.STRING },
    poder: { type: DataTypes.INTEGER },
    rareza: { type: DataTypes.ENUM('comun', 'raro', 'poco comun', 'epico', 'legendario') }
});

module.exports = variacionesModel