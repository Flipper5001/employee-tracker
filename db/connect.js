// functions created in scripts folder for easy of use and convenience, making app.js smaller and easier to understand

try {
    require('dotenv').config();
} catch {
    console.log('Missing dotenv file')
}

const mysql = require('mysql2/promise');

// return needed when running query
function connect(){

    return mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: `employee_cms`,
    })
}


module.exports = {connect};