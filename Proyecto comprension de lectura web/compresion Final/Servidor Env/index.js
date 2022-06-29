require("dotenv").config({path: 'variables.env'});
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const config = require('./config');
const route = require('./routers/userRoutes');


const { port, alloedDomains } = config;

const app = express();
app.use( express.json({ extended: true }));

// app.use(cors({origin: alloedDomains}));
app.use(cors());
// app.use(express.urlencoded({ extended: false }));

// app.use(helmet());

// app.use(compression());

// app.get('/', (req, res) => {
//     return res.send("Hola Mundo");
// })


const server = http.createServer(app);

// //Routes
app.use(route);

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})

