import express from "express";
import db from "../db.js";


const router = express.Router();


router.get("/", (req, res) => {
db.query("SELECT * FROM vendors", (err, results) => {
if (err) return res.status(500).json(err);
res.json(results);
});
});


router.post("/", (req, res) => {
    console.log(req.body);
const { vendor_name, contact } = req.body;
db.query(
"INSERT INTO vendors (vendor_name, contact) VALUES (?, ?)",
[vendor_name, contact],
(err) => {
if (err) return res.status(500).json(err);
res.json({ message: "Vendor added" });
}
);
});


router.delete("/:id", (req, res) => {
db.query("DELETE FROM vendors WHERE id=?", [req.params.id], (err) => {
if (err) return res.status(500).json(err);
res.json({ message: "Vendor deleted" });
});
});


export default router;