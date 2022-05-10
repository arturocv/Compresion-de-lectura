const express = require('express');
const conectarDB = require('./config/db');  //Improtamos el archico de conexion


//Crear servidor
const app = express();


//Conectamos a la BD
conectarDB();

//habilitar express.json
app.use(express.json({extended: true}));


//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;


//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));



//Definir la pagina principal
// app.get('/', (req, res) => {
//     res.send('Hola Mundo');
// });


//Inicar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});