//generamos el CRUD para variaciones
// requerimos el model de la tabla variaciones
const sequelize = require("sequelize");
const { UPDATE } = require("sequelize/lib/query-types");
const variacionesModel = require("../models/variacionesModel.js");
const objetosModel = require("../models/objetosModel.js");

//traemos el fs para leer los json para cargar en bulk
const fs = require("fs");
const variacionesJSON = JSON.parse(fs.readFileSync("./data/variaciones.json", "utf-8"));

//funcion de prueba para probar el controller
const showObjetos = (req, res) => {
    res.json('Estamos en variaciones');
};

/*  
    FUNCION PARA TRAER TODOS LAS VARIACIONES
    READ
    GET 
*/
const traerVariaciones = async(req, res) => {
    try {
        //CHEQUEAMOS QUE NO SE ESTEN PASANDO PARAMETROS POR LA URL
        if (!Object.keys(req.query).length) {
            const variacion = await variacionesModel.findAll();
            variacion ? res.status(200).json(variacion) : res.status(404).json({ error: 'Variacion no encontrado' });
        } else {
            //SI SE PASAN PARAMETROS VAMOS A CONTROLAR QUE NOS TRAE Y QUE NO, PARA ARMAR LA BUSQUEDA, EL ORDER Y LOS LIMITES DEL SELECT
            const opciones = {}
            const where = {}
            const includedata = {};

            //CONTROLAMOS LIMIT
            if (req.query.limit) {
                opciones.limit = Number(req.query.limit);
            }

            //CONTROLAMOS EL OFFSET
            if (req.query.page) {
                opciones.offset = Number(req.query.page);
            }

            //CONTROLAMOS EL SORT PARA ORDENAR POR FEHCA DE CREACION
            if (req.query.sort) {
                opciones.order = [
                    ['createdAt', req.query.sort]
                ];
            }

            //ACA ARRANCAMOS A CONTROLOS LOS CASOS PARA LOS WHERE
            if (req.query.rareza) {
                where.rareza = req.query.rareza;
            }
            if (req.query.afinidad) {
                where.afinidad = req.query.afinidad;
            }
            if (req.query.status) {
                where.status = req.query.status;
            }
            opciones.where = where;

            //AGREGO UNA BUSQUEDA EXTRA CON EL MODELO DE OBJETO PARA PODER RELACIONAR CON LA OTRA TABLA
            if (req.query.tipo) {
                includedata.model = objetosModel;
                includedata.require = true;
                includedata.where = { tipo: req.query.tipo };
                opciones.include = includedata;
            }

            const variacion = await variacionesModel.findAll(opciones);
            variacion ? res.status(200).json(variacion) : res.status(404).json({ error: 'Variacion no encontrada' });
        }
    } catch (error) {
        res.json({ message: error.message })
    }
};
/*  
    FUNCION PARA TRAER UN OBJETO
    READ
    GET 
*/

const traerVariacion = async(req, res) => {
    try {
        const variacion = await variacionesModel.findByPk(req.params.id)
        variacion ? res.status(200).json(variacion) : res.status(404).json({ error: 'Variacion no encontrada' });
    } catch (error) {
        res.json({ message: error.message })
    }

};

/* 
    FUNCION QUE CREA UN REGISTRO 
    CREATE 
    POST
*/

const crear = async(req, res) => {
    try {
        const crear = req.query.startData != 'si' ? await variacionesModel.create(req.body) : await variacionesModel.bulkCreate(variacionesJSON);
        crear ? res.status(201).json("registro creado correctamente") : res.status(404).json({ error: 'Variacion no encontrada' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

/* 
    FUNCION PARA ACTUALIZAR UN REGISTRO
    UPDATE
    PUT
*/
const actualizar = async(req, res) => {
    try {
        const actualizar = await variacionesModel.update(req.body, {
            where: { id: req.params.id }
        })
        actualizar ? res.status(200).json("Registro Actualizado Correctamente") : res.status(404).json({ error: 'Objeto no encontrado' });
    } catch (error) {
        res.json({ message: error.message })
    }
};

/* 
    FUNCION PARA ELIMINAR UN REGISTRO
    DELETE
    GET  
*/

const borrarVariacion = async(req, res) => {
    try {
        await variacionesModel.destroy({
            where: { id: req.params.id }
        })
        borrar ? res.status(200).json("Registro Borrado Correctamente") : res.status(404).json({ error: 'Objeto no encontrado' });
    } catch (error) {
        res.json({ message: error.message })
    }
};


//AGREGAMOPS FUNCION EXTRA PARA TRAER UN OBJETO RAMDOM DE TODOS LOS CARGADOS
const randomVariacion = async(req, res) => {
    try {
        const variacion = await variacionesModel.findAll({
            order: [
                sequelize.literal('-LOG(1.0 - RAND()) / if(rareza = "comun",1,if(rareza = "raro",2,if(rareza = "poco comun",3,if(rareza = "epico",4,if(rareza = "legendario",5,"")))))')
            ],
            limit: 1
        });
        //res.json({ variacion });

        let data = variacion[0].dataValues;
        res.render("cofre", { data: data });
        // let data = variacion.;
        // console.log(data);
        // res.render("cofre", { data: data });
    } catch (error) {
        res.json({ message: error.message })
    }
};




module.exports = { traerVariaciones, traerVariacion, crear, actualizar, borrarVariacion, randomVariacion };