import express from "express";
import db from "../db.js";
const router = express.Router();


router.get("/", (req, res) => {
db.query("SELECT * FROM departments", (err, results) => {
if (err) return res.status(500).json(err);
res.json(results);
});
});


router.post("/", (req, res) => {
const { department_name } = req.body;
db.query(
"INSERT INTO departments (department_name) VALUES (?)",
[department_name],
(err) => {
if (err) return res.status(500).json(err);
res.json({ message: "Department added" });
}
);
});


router.delete("/:id", (req, res) => {
db.query("DELETE FROM departments WHERE id = ?", [req.params.id], (err) => {
if (err) return res.status(500).json(err);
res.json({ message: "Department deleted" });
});
});


export default router;