const mysql = require('promise-mysql');
const config = require('../config/config');

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }  
//     console.log('connected as id ' + connection.threadId);
// });

// const getConnection = () => {
//     return connection;
// }

module.exports = connection;