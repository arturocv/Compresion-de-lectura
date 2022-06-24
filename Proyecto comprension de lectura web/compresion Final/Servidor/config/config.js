const mysql = require('promise-mysql');
require('dotenv').config({path: 'variables.env'});


const connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

const getConnection = () => {     
    return connection;
};

module.exports = {
    getConnection
};