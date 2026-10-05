const db = require("../config/database");

const getAllStudents = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM students";

        db.query(sql, (error, results) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(results);
        });
    });
};

const createStudent = (student) => {
    return new Promise((resolve, reject) => {
        const {
            name,
            email,
            phone,
            branch,
            year,
            gender,
            date_of_birth
        } = student;

        const sql = `
            INSERT INTO students
            (name, email, phone, branch, year, gender, date_of_birth)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name,
            email,
            phone,
            branch,
            year,
            gender,
            date_of_birth
        ];

        db.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });
};

const updateStudent = (id, student) => {
    return new Promise((resolve, reject) => {
        const {
            name,
            email,
            phone,
            branch,
            year,
            gender,
            date_of_birth
        } = student;

        const sql = `
            UPDATE students
            SET name = ?,
                email = ?,
                phone = ?,
                branch = ?,
                year = ?,
                gender = ?,
                date_of_birth = ?
            WHERE id = ?
        `;

        const values = [
            name,
            email,
            phone,
            branch,
            year,
            gender,
            date_of_birth,
            id
        ];

        db.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });
};

const deleteStudent = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM students WHERE id = ?";

        db.query(sql, [id], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });
};

module.exports = {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent
};