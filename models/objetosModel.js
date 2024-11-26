/* importar la base de datos */
const db = require("../data/db.js")
    // requerimos el FataType de sequelize
const { DataTypes } = require("sequelize");
const variacionesModel = require("./variacionesModel.js");

/* nombre de la tabla y defina sus columnas y tipos de datos */

const objetosModel = db.define("objetos", {
    nombre: { type: DataTypes.STRING },
    tipo: {
        type: DataTypes.STRING,
        validate: {
            isLowercase: {
                boolean: true,
                msg: "Ingresar el tipo en lowercase"
            },
            isIn: {
                args: [
                    ['arma', 'consumible', 'magia', 'tesoro'],
                ],
                msg: "Debe ser un tipo valido entre los sigientes: ['arma', 'consumible', 'magia', 'tesoro']"
            }
        }
    }
});
//establecemos la relacion uno a muchos desde la tabla objetos hacia variaciones
objetosModel.hasMany(variacionesModel, { onDelete: "CASCADE" });
variacionesModel.belongsTo(objetosModel, { onDelete: "CASCADE" });

module.exports = objetosModel