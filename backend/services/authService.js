const db = require("../config/database");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const registerUser = async (user) => {
    const {
        name,
        email,
        password
    } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
        `;

        const values = [
            name,
            email,
            hashedPassword
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

const loginUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT *
            FROM users
            WHERE email = ?
        `;

        db.query(sql, [email], async (error, results) => {
            if (error) {
                reject(error);
                return;
            }

            if (results.length === 0) {
                resolve(null);
                return;
            }

            const user = results[0];

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                resolve(null);
                return;
            }

           const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

resolve({
    user,
    token
});
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};

