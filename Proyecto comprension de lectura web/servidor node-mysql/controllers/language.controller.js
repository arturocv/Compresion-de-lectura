const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
import { getConnection} from '../database/database';

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM usuarios');
        res.json(result);        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getLanguagesById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM usuarios WHERE id=${id}`);
        res.json(result);        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addLanguages = async (req, res) => {
    try {
        const {nombres, email, institucion, pin, estado, texto, password} = req.body;

        if(nombres === "" || email === "" || 
            institucion === "" || pin === "" || 
            estado === "" || texto === "" || password === "")
        {
            res.status(400).json({message: "Por favor llene todos los campos."});
        }

        const connection = await getConnection();

        //Validamos que el email no exita
        const result = await connection.query("SELECT * FROM usuarios WHERE email = ?", email);    

        if(result[0] != null){
            res.json({
                mensaje: "El usuario ya existe",
            });            
            return;
        }     

        //Validamos que el pin exista y que no se haya utilizado
        const userPin = await connection.query("SELECT * FROM usuarios WHERE pin = ?", pin);
        if(userPin[0] != null){
            res.json({mensaje: "El Pin no existe o ya fue utilizado"});
            return;
        }else{
            bcrypt.hash(password, 10, (error, contraseñaHasheada) => {
                if(error){
                    res.json({ mensaje: error })
                }else{
                    const usuario = {
                        nombres, 
                        email, 
                        institucion, 
                        pin, 
                        estado, 
                        texto, 
                        password: contraseñaHasheada
                    };
                    connection.query('INSERT INTO usuarios SET ?', usuario);
                    res.status(200).json({mensaje:"usuario creado correctamente"});
                }

            })
        }

        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const {nombres, email, institucion, pin, estado, texto, password} = req.body;

        if(nombres === "" || email === "" || 
            institucion === "" || pin === "" || 
            estado === "" || texto === "" || password === "")
        {
            res.status(400).json({message: "Por favor llene todos los campos."});
        };
        
        const usuario = {nombres, email, institucion, pin, estado, texto, password};
        const connection = await getConnection();
        const result = await connection.query("UPDATE usuarios SET ? WHERE id = ?", [usuario, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuarios WHERE email= ?", email);

        if(result[0] == null){
            return res.json({ mensaje: "Usuario no encontrado", result });
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
                    
                    res.json({
                        mensaje: "Usuario logeado correctamente",
                        usuario: {
                            id,
                            nombres,
                            token,
                        },
                    });
                }else{
                    return res.json({ mensaje: "Contraseña incorrecta" });
                }
            })
        }

        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getLanguages,
    addLanguages,
    getLanguagesById,
    deleteLanguage,
    updateLanguage,
    login
};