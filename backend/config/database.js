const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql@i9",
    database: "student_management"
});

connection.connect((error) => {
    if (error) {
        console.error("Database connection failed:", error.message);
        return;
    }

    console.log("MySQL database connected");
});

module.exports = connection;