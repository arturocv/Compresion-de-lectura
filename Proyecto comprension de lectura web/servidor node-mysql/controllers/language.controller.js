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

        const usuario = {nombres, email, institucion, pin, estado, texto, password};

        const connection = await getConnection();
        await connection.query('INSERT INTO usuarios SET ?', usuario);
        res.status(200).json("usuario creado correctamente");        
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
        }

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

export const methods = {
    getLanguages,
    addLanguages,
    getLanguagesById,
    deleteLanguage,
    updateLanguage
};