import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all maintenance records
router.get("/", (req, res) => {
  db.query("SELECT * FROM maintenance", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add new maintenance record
router.post("/", (req, res) => {
  const { laptop_id, vendor_id, issue_description, maintenance_date, status } = req.body;

  db.query(
    "INSERT INTO maintenance (laptop_id, vendor_id, issue_description, maintenance_date, status) VALUES (?, ?, ?, ?, ?)",
    [laptop_id, vendor_id, issue_description, maintenance_date, status],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Maintenance record added" });
    }
  );
});

// Delete maintenance record
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM maintenance WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Maintenance entry deleted" });
  });
});

export default router;
