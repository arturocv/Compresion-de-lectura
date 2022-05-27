const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const { nombres, email, colegio, pin, password } = req.body;

    Usuario.findOne({email}).then((usuario) => {
        if(usuario){
            return res.status(400).json({mensaje: "Ya existe un usuario con ese correo"});
        }else if(!nombres || !email || !colegio || !pin || !password){
            return res.status(400).json({mensaje: "Todos los datos son obligatorios"});
        }else{
            bcrypt.hash(password, 10, (error, passwordHash ) => {
                if(error){
                    res.status(400).json({error});
                }else{
                    const nuevoUsuario = new Usuario({
                        nombres,
                        email,
                        colegio,
                        pin,
                        password: passwordHash
                    });

                    nuevoUsuario.save().then((usuario) => {
                        res.status(200).json({mensaje: "usuario creado correctamente", usuario});
                    }).catch(error => console.error(error));
                    
                    //Crear el JWT 
                    const payload = {
                        nuevoUsuario: {
                            id: nuevoUsuario.id
                        }
                    }
                    //Firmar el JWT
                    jwt.sign(payload, process.env.SECRETA, {
                        expiresIn: 3600
                    }, (error, token) => {
                        if(error) throw error;
                        res.json({token});
                    });
                }
            });

        }
    });
}


module.exports = register;