const express = require('express');
const config = require('./config');
const database = require('./database/db');
const route = require('./routes/register');
const cors = require('cors');

//Exxtraer puerto de conexion
const {port, alloedDomains} = config;

//Inicial base de datos
database();


//Inicar el servidor
const app = express();

//Habilitar el json para leerlo
app.use(express.json({ extended: true }));
app.use(cors());

app.use(route);


//Escuchar puerto de conexion
app.listen(port, (req, res) => {
    console.log(`Servidor funcionando en el puerto ${port}`);
})

