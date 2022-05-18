const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer el email y password
    const { email, password } = req.body;

    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto) {
            return res.status(400).json({msg: 'Password Incorrecto' })
        }

        // Si todo es correcto Crear y firmar el JWT
         const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token  });
        });

    } catch (error) {
        console.log(error);
    }
}


// Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {   
    console.log(req.body);
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});

        console.log(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}












// const Usuario = require('../models/Usuario');
// const bcrypjs = require('bcryptjs');
// const {validationResult} = require('express-validator');
// const jwt = require('jsonwebtoken');

// exports.autenticarUsuario = async (req, res) => {

//     //revisar si hay errores
//     const errores = validationResult(req);
//     if(!errores.isEmpty()){
//         return res.status(400).json({ errores: errores.array() });
//     }

//     //Extraer el email y el password
//     const {email, password} = req.body;

//     try {
//         //revisar que se un usuario registado
//         let usuario = await Usuario.findOne({email});

//         if(!usuario){
//             return res.status(400).json({msg: 'El usuario no existe'});
//         }

//         //revisar el password
//         const passCorrecto = await bcrypjs.compare(password, usuario.password);
//         if(!passCorrecto){
//             return res.status(400).json({msg: 'Contraseña incorrecta'});
//         }

//         //Crear y firmar el JWT
//         const payload = {
//             usuario: {
//                 id: usuario.id
//             }
//         }

//         //Firmar el JWT
//         jwt.sign(payload, process.env.SECRETA, {
//             expiresIn: 3600
//         }, (error, token) => {
//             if(error) throw error;

//             res.json({token});
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }

// //Obtiene que usuario esta autenticado
// exports.usuarioAutenticado = async(req, res) => {
//     try {
//         const usuario = await Usuario.findById(req.usuario.id).select('-password');
//         res.json({usuario});

//         console.log(usuario);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: 'Hubo un error en el registro'});
//     }
// }


