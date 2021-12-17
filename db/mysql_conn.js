var mysql = require('mysql2');

var mysqlConn = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    port	 : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PORT,
    database : process.env.MYSQL_DB
})
module.exports = mysqlConn