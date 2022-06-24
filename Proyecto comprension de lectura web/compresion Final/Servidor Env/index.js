require("dotenv").config({path: 'variables.env'});
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const config = require('./config');


const { port, alloedDomains } = config;

const app = express();

app.use(cors({origin: alloedDomains}));
app.use(helmet());

app.use(compression());

app.get('/', (req, res) => {
    return res.send("Hola Mundo");
})


const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})


// const express = require('express');
// const route = require('./routers/userRoutes');
// const cors = require('cors');


// //Crear el servidor
// const app = express();

// //Hablitar json en express
// app.use( express.json({ extended: true }));


// app.use(cors());


// //Puerto de la app
// const port = process.env.PORT || 4000;



// //Routes
// app.use(route);

// //Iniciar la app
// app.listen(port, () => {
//     console.log(`El servidor esta funcionando en el puerto ${port}`);
// });
