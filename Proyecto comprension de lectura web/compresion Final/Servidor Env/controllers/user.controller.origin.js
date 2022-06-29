const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {getConnection} = require('../database/db');


exports.addUser = async(req,res) => {
    try {
        const {nombres, email, institucion, pin, texto, password} = req.body;

        if(nombres === "" || email === "" || 
            institucion === "" || pin === "" || 
            texto === "" || password === "")
        {
            return res.status(400).json({message: "Por favor llene todos los campos."});
        }

        const connection = await getConnection();

        //Validamos que el email no exita
        const result = await connection.query("SELECT * FROM usuarios WHERE email = ?", email);    

        if(result[0] != null){
            return res.status(400).json({ mensaje: "El usuario ya existe"});    
        }     

        //Validamos que el pin exista y que no se haya utilizado
        const userPin = await connection.query("SELECT * FROM usuarios WHERE pin = ? and estado=0", pin);

        if(userPin[0] == null){          
            return res.status(400).json({mensaje: "El Pin no existe o ya fue utilizado"});
        }else{
            bcrypt.hash(password, 10, (error, contraseñaHasheada) => {
                if(error){
                    res.json({ mensaje: error })
                }else{
                    const usuario = {
                        nombres, 
                        email,
                        pin, 
                        institucion,                         
                        estado: 1, 
                        password: contraseñaHasheada
                    };
                    connection.query("UPDATE usuarios SET ? WHERE pin = ?", [usuario, pin]);                    
                    res.status(200).json({mensaje:"usuario creado correctamente"});
                }
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Error desde el registro'});
        // res.setHeader('Content-Type', 'text/plain');
        res.send(error.message);
        return;
        // return res.status(503).send({status: 1, mensaje: "Messages not available!"});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuarios WHERE email= ?", email);

        if(result[0] == null){
            return res.status(400).json({ mensaje: "Usuario no encontrado"});
        }else{
            bcrypt.compare(password, result[0].password).then((esCorrecto) => {
                if(esCorrecto){
                    const { id, nombres, email } = result[0];

                    const payload = {
                        usuario: {
                            id: result[0].id
                        }
                    }
                    const token = jwt.sign(payload, process.env.SECRETA, {
                        expiresIn: 3600
                    });
                    return res.status(200).json({
                        mensaje: "Usuario logeado correctamente",
                        token,
                        usuario: {
                            id,
                            nombres,
                            email                     
                        },
                    });
                }else{
                    return res.status(400).json({ mensaje: "Contraseña incorrecta" });
                }
            })
        }        
    } catch (error) {
        // res.status(500).json({mensaje: 'Error de login'});
        // res.send(error.message);
        // return;
        return res.status(500).json({mensaje: "Error de login!"});
    }
}

exports.autenticacionUser = async(req, res) => {
    try {
        const connection = await getConnection();
        // const usuario = await connection.query("SELECT * FROM usuarios WHERE id= ?", req.usuario.id);  Para pedir todos los datos del usuario
        const usuario = await connection.query("SELECT nombres, email, institucion, texto, id FROM usuarios WHERE id= ?", req.usuario.id);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(404).json({mensaje: 'Error de Autenticación'});
    }
}