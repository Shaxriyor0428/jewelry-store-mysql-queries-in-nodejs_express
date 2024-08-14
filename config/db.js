const mysql = require("mysql2");
const connect = mysql.createConnection({
    user:process.env.USER_NAME,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    database:process.env.DB
});
module.exports = connect