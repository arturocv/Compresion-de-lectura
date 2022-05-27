const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const controllers = require('./controllers');

const app = express();

app.use(cors());
app.use(express.json());


//Rutas de la app
app.get("/user/:userId", controllers.getUserById);
app.post("/registro", controllers.register);
app.post("/login", controllers.login);


//Puerto de la app
const PORT = process.env.PORT || 4000;


//COnectar a la base de datos
conectarDB();


//Definir pagina principal y mostrar msg en el navegador para probar la URL
// app.get('/', (req, res) => {
//     res.send('Hola Mundo')
// })


//Arrancar la appp
app.listen(PORT, () => {
    console.log(`EL servidor esta funcionando en el puerto ${PORT}`);
})