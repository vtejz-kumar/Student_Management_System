const express = require("express");

const router = express.Router();

const {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

const validateStudent = require("../middleware/studentValidation");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, getStudents);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    validateStudent,
    createStudent
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    validateStudent,
    updateStudent
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteStudent
);

module.exports = router;