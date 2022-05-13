const mongoose = require('mongoose');
const app = require('./app');
const PORT_SERVER = process.env.PORT || 3977;

const {API_VERSION, IP_SERVER, porDb} = require('./config');


mongoose.connect(`mongodb://${IP_SERVER}:${porDb}/webpersonal`, 
                {useNewUrlParser:  true, useUnifiedTopology: true}, (err, res) => {
                    if(err){
                        throw err;
                    }else{
                        console.log("Conexion OK");

                        app.listen(PORT_SERVER, () => {
                            console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
                        })
                    }
                });

