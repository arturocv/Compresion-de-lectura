const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, password } = req.body;

    Usuario.findOne({ email }).then((usuario) => {
        if (!usuario) {
            return res.json({ mensaje: "Usuario no encontrado" });
        }

        bcrypt.compare(password, usuario.password).then((esCorrecta) => {
            if (esCorrecta) {
                const { id, nombres } = usuario;

                const payload = {
                    usuario: {
                        id: usuario.id
                    }
                }

                const token = jwt.sign(payload, process.env.SECRETA, {
                    expiresIn: 3600
                });
                
                res.json({
                    mensaje: "Usuario logeado correctamente",
                    usuario: {
                        id,
                        nombres,
                        token,
                    },
                });                

            } else {
                return res.json({ mensaje: "Contraseña incorrecta" });
        }
        });
    });
}


module.exports = login;
