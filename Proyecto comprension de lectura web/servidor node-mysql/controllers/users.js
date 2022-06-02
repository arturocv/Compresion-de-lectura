const conectDB = require('../config/db');
const mysql = require('mysql');

const users = (req, res) => {
    const { connection} = conectDB;
    // res.send("Desde usuarios");

    const sql = 'SELECT * FROM usuarios';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not result');
        }
    });

}

module.exports = users;