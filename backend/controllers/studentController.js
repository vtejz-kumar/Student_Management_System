const studentService = require("../services/studentService");

const getStudents = async (req, res, next) => {
    try {
        const students = await studentService.getAllStudents();

        res.json(students);
    } catch (error) {
        next(error);
    }
};

const createStudent = async (req, res, next) => {
    try {
        const result = await studentService.createStudent(req.body);

        res.status(201).json({
            message: "Student added successfully",
            studentId: result.insertId
        });
    } catch (error) {
        next(error);
    }
};

const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await studentService.updateStudent(
            id,
            req.body
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await studentService.deleteStudent(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
};