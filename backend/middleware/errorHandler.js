const errorHandler = (error, req, res, next) => {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            message: "Email already exists"
        });
    }

    res.status(500).json({
        message: "Internal server error"
    });
};

module.exports = errorHandler;