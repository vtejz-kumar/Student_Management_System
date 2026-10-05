require("dotenv").config();

const express = require("express");

const studentRoutes = require("./routes/studentRoutes");

const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Student Management System Backend");
});

app.use("/api/students", studentRoutes);

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});