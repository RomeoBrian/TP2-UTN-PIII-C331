//iniciamos todas las variables necesarias
const express = require("express");
const cors = require("cors");
const env = require('dotenv').config();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const yaml = require('yamljs');
const documentacion = yaml.load('./swagger.yaml');

//definimos el puerto
const PORT = process.env.PORT;

//generamos la instancia de express
const app = express();

app.use(cors());
app.use(express.json());

//traemos las rutas
const objetosRoutes = require("./routes/objetosRoutes.js");
const variacionesRoutes = require("./routes/variacionesRoutes.js");

app.set("views", path.join(__dirname, "views")); // definimos la carpeta views como ubicacion de las vistas
app.set("view engine", "ejs"); // definimos EJS como el motor de vistas para reenderizar contenido dinamico

// Middleware para servir archivos estaticos (css,js,imagenes,etc) desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));


//Definimos las rutas
app.use("/objetos", objetosRoutes);
app.use("/variaciones", variacionesRoutes);
app.use("/", swaggerUi.serve, swaggerUi.setup(documentacion));



//Iniciamos el servidor en el puerto definido
app.listen(PORT, () => { console.log(`Servidor ok en el puerto ${PORT}`); });