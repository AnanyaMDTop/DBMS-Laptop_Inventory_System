import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all laptop assignments
router.get("/", (req, res) => {
  db.query("SELECT * FROM laptop_assignments", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add new assignment
router.post("/", (req, res) => {
  const { laptop_id, employee_id, assigned_date, returned_date } = req.body;

  db.query(
    "INSERT INTO laptop_assignments (laptop_id, employee_id, assigned_date, returned_date) VALUES (?, ?, ?, ?)",
    [laptop_id, employee_id, assigned_date, returned_date],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Laptop assignment added" });
    }
  );
});

// Delete an assignment
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM laptop_assignments WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Laptop assignment deleted" });
  });
});

export default router;
