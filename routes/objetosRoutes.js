//requerimos el express
const express = require("express");
const router = express.Router();

//traemos el controler
const { traerObjetos, traerObjeto, crear, actualizar, borrarObjeto } = require("../controllers/objetosController.js");

//definimos la ruta para el get de todos los objetos
router.get("/", traerObjetos);
router.get("/:id", traerObjeto);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", borrarObjeto);


module.exports = router;