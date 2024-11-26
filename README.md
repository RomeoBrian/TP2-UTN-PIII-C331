<img src="assets/utn_logo.svg" width="150">
# API - Objetos y Variantes

## La Siguiente API esta preparada para menejar los objetos para un formato de juego RPG y Variantes de los objetos base. La api tiene un formato CRUD para poder crear, leer, actualizar y borrar. 

## dependencias:
Las siguientes son las dependencias que encontraras en el projecto
- **Node.js**: JavaScript runtime environment for server-side programming.
- **Express**: Framework for building web applications and APIs.
- **CORS**: Middleware to allow requests from different origins.
- **MySQL2**: Client for interacting with MySQL databases.
- **Sequelize**: ORM for managing SQL databases.
- **dotenv**: Loads environment variables from a .env file.
- **Nodemon**: Tool that automatically restarts the application when file changes are detected.
- **Swagger**: Tool that automatically generates APIRest Docs.
- **Ejs**: Embedded JavaScript templating.

```plaintext 
├── controllers/  
├── models/       
├── routes/       
├── data/
├── public/
├── views/        
└── app.js     
```

## Utilizacion

En primera instancia se debera clonar este repositorio 
```
git clone https://github.com/RomeoBrian/TP2-UTN-PIII-C331.git
```
Una vez clonado el repositorio se debe configurar el archivo .env
En este archivo se encuentran las configuraciones de la db y el puerto al que apunta la api

Luego se debera instalar las dependencias con el siguiente comando:
```
npm i
```

## Generar la base de datos 

Se dejo en la ruta data/ el archivo database.sql

este archivo se debera correr en mysql workbench o su gestor de base de datos 

## Antes de empezar a usar la api

En principio se debe iniciar el servidor con el siguiente comando

```
nodemon app.js
```

una vez iniciado si se dirigue a [localhost:3030/](http://localhost:3030/) Se encontrara con la documentacion en Swagger en el mismo puede probar las distintas rutas

en principio se recomienda correr el post tanto para objetos como para variantes, en los mismos tiene la posibilidad de mediante una query 
```
/objetos?startData=si
/variantes?startData=si
```

Esto cargara los datos iniciales para que pueda empezar a probar la api, 

en caso de no querer cargarlo mediante este metodo siempre puede ver los archivos en:
```
/data/objetos.json
/data/variantes.json
```

En estos encontrara los datos que se cargan automaticamene en la db con el otro comando, y puede cargarlos manualmente

## Para finalizar se agrego tambien una vista a la api para que vea su uso

La misma se encuentra en la ruta
```
http://localhost:3030/variaciones/random
```

En esta encontrara un cofre que al abrir traera de forma aleatoria una variante con sus detalles, pruebe su userte.

## Endpoints
Se puede encontrar los isguientes endpoints

**Objetos**
```
GET /objetos
POST /objetos
