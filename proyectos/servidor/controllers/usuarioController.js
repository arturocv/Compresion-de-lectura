const Usuario = require('../models/Usuario');
const bcrypjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {

    //Revisamos si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }


    //Extraer Email y password por destructuring    
    const {email, password} = req.body;

    try {

        //Revisar que el susario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario y existe'});
        }
        
        //Crea nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcrypjs.genSalt(10);
        usuario.password = await bcrypjs.hash(password, salt);

        //guardar nuevo usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({token});
        });

        //Mensaje de conformación
        //res.json({msg: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}