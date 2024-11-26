//requerimos el express
const express = require("express");
const router = express.Router();

//traemos el controler
const { traerVariaciones, traerVariacion, crear, actualizar, borrarVariacion, randomVariacion } = require("../controllers/variacionesController.js");

//definimos la ruta para las variantes
router.get("/", traerVariaciones);
router.get("/random", randomVariacion);
router.get("/:id", traerVariacion);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", borrarVariacion);


module.exports = router;