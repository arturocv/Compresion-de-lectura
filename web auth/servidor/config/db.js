const mognoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

//Funcion para conectar con la base de datos
const conectarDB = async() => {
    try {
        await mognoose.connect(process.env.DB_MONGO, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('DB conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);  //En caso de error detener la app
    }
}

module.exports = conectarDB;
