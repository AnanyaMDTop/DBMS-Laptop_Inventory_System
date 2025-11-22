import express from "express";
import db from "../db.js";
const router = express.Router();


router.get("/", (req, res) => {
db.query("SELECT * FROM laptops", (err, results) => {
if (err) return res.status(500).json(err);
res.json(results);
});
});


router.post("/", (req, res) => {
const { model, brand, serial_no, employee_id, status } = req.body;
db.query(
"INSERT INTO laptops (model, brand, serial_no, employee_id, status) VALUES (?, ?, ?, ?, ?)",
[model, brand, serial_no, employee_id, status],
(err) => {
if (err) return res.status(500).json(err);
res.json({ message: "Laptop added" });
}
);
});


router.delete("/:id", (req, res) => {
db.query("DELETE FROM laptops WHERE id=?", [req.params.id], (err) => {
if (err) return res.status(500).json(err);
res.json({ message: "Laptop deleted" });
});
});


export default router;  