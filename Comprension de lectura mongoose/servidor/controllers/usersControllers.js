const Users = require('../models/Users');
const Pines = require('../models/Pines');
const bcrypt = require('bcrypt');
const { validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

exports.addUsers = async(req, res) => {

    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    const { email, password, pin} = req.body;
     
    try {
        //Validar que no exista un usuario con ese email
        let user = await Users.findOne({ email });
        if(user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        //VALIDAMOS QUE EL PIN NO SE HAYA UTILIZADO Y QUE EXISTA
        let valPin = await Pines.find({pin});

        if(valPin.length === 0){
            return res.status(400).json({ msg: 'Pin no existe' });
        }    

        if(valPin[0].estado == 1){
            return res.status(400).json({ msg: 'Pin ya fue utilizado'});
        }        
        
        //Crea nuevo usuario
        user = new Users(req.body);

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt );

        user.texto = valPin[0].texto;

        //Guardar nuevo usuario
        await user.save();        

        //Mensaje de confirmacion
        res.status(200).json({ msg: 'El usuario creado correctamente' });
        // mongoose.connection.close();
    } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Validamos que el usuario exista
        let user = await Users.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //Comparamos las contraseñas
        const correctPass = bcrypt.compareSync(password, user.password);
        if(!correctPass) {
            return res.status(400).json({msg: 'Password Incorrecto' })
        }

        // Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;
            // Mensaje de confirmación
            res.json({ token });
        });

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.userAuth = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}