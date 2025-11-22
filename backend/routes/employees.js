import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all employees
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new employee (with email included)
router.post("/", (req, res) => {
    console.log(req.body);
  const { name, department_id, email } = req.body;

  if (!name || !department_id || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    "INSERT INTO employees (name, department_id, email) VALUES (?, ?, ?)",
    [name, department_id, email],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee added successfully" });
    }
  );
});

// DELETE employee by ID
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM employees WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted" });
  });
});

export default router;
