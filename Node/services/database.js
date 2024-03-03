const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'AC08jg17z22',
    database: 'roleverse'
})

connection.connect((err) => {
    if (err){
        console.log(err.stack)
        return
    }
    console.log(connection.threadId)
})

module.exports = connection