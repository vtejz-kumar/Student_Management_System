const authService = require("../services/authService");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const result = await authService.registerUser({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser(
    email,
    password
);

if (!result) {
    return res.status(401).json({
        message: "Invalid email or password"
    });
}

const { user, token } = result;

res.json({
    message: "Login successful",
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};