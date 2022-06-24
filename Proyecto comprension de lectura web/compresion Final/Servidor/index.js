const express = require('express');
const route = require('./routers/userRoutes');
const cors = require('cors');


//Crear el servidor
const app = express();

//Hablitar json en express
app.use( express.json({ extended: true }));


app.use(cors());


//Puerto de la app
const port = process.env.PORT || 4000;



//Routes
app.use(route);

//Iniciar la app
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});