//generamos el CRUD para objetos
// requerimos el model de la tabla objetos
const { UPDATE } = require("sequelize/lib/query-types");
const objetosModel = require("../models/objetosModel.js");
const variacionesModel = require("../models/variacionesModel.js");

//traemos el fs para leer los json para cargar en bulk
const fs = require("fs");
const objetosJSON = JSON.parse(fs.readFileSync("./data/objetos.json", "utf-8"));

//funcion de prueba para probar el controller
const showObjetos = (req, res) => {
    res.json('Estamos en objetos');
};

/*  
    FUNCION PARA TRAER TODOS LOS posteos
    READ
    GET 
*/
const traerObjetos = async(req, res) => {
    try {
        const objetos = await objetosModel.findAll()
        objetos ? res.status(200).json(objetos) : res.status(404).json({ error: 'Objeto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
/*  
    FUNCION PARA TRAER UN OBJETO
    READ
    GET 
*/

const traerObjeto = async(req, res) => {
    try {
        const objeto = req.query.variaciones != 'si' ? await objetosModel.findByPk(req.params.id) :
            await objetosModel.findByPk(req.params.id, { include: variacionesModel });
        objeto ? res.status(200).json(objeto) : res.status(404).json({ error: 'Objeto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};


/* 
    FUNCION QUE CREA UN REGISTRO 
    CREATE 
    POST
*/

const crear = async(req, res) => {
    try {
        const crear = req.query.startData != 'si' ? await objetosModel.create(req.body) : await objetosModel.bulkCreate(objetosJSON);
        crear ? res.status(201).json("registro creado correctamente") : res.status(404).json({ error: 'Objeto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* 
    FUNCION PARA ACTUALIZAR UN REGISTRO
    UPDATE
    PUT
*/
const actualizar = async(req, res) => {
    try {
        const actualizar = await objetosModel.update(req.body, {
            where: { id: req.params.id }
        })
        actualizar ? res.status(200).json("Registro Actualizado Correctamente") : res.status(404).json({ error: 'Objeto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

/* 
    FUNCION PARA ELIMINAR UN REGISTRO
    DELETE
    GET  
*/

const borrarObjeto = async(req, res) => {
    try {
        const borrar = await objetosModel.destroy({
            where: { id: req.params.id }
        })
        borrar ? res.status(200).json("Registro Borrado Correctamente") : res.status(404).json({ error: 'Objeto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};




module.exports = { traerObjetos, traerObjeto, crear, actualizar, borrarObjeto };