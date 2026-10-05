const validateStudent = (req, res, next) => {

    if (!req.body) {
        return res.status(400).json({
            message: "Request body is required"
        });
    }

    const {
        name,
        email,
        phone,
        branch,
        year,
        gender,
        date_of_birth
    } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (!email || email.trim() === "") {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    if (!phone || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({
            message: "Phone must contain exactly 10 digits"
        });
    }

    if (!branch || branch.trim() === "") {
        return res.status(400).json({
            message: "Branch is required"
        });
    }

    if (!year || year < 1 || year > 4) {
        return res.status(400).json({
            message: "Year must be between 1 and 4"
        });
    }

    if (!gender || gender.trim() === "") {
        return res.status(400).json({
            message: "Gender is required"
        });
    }

    if (!date_of_birth) {
        return res.status(400).json({
            message: "Date of birth is required"
        });
    }

    next();
};

module.exports = validateStudent;