const mysql = require('mysql')
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "RuethS54%sO$",
    database : "Build3Bot"
})

module.exports = db;