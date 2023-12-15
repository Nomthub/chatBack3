const mysql = require('mysql')
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "Build3Bot"
})

module.exports = db;
