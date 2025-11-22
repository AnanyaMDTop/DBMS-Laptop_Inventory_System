import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import employees from "./routes/employees.js";
import vendors from "./routes/vendors.js";
import departments from "./routes/departments.js";
import laptops from "./routes/laptops.js";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/employees", employees);
app.use("/api/vendors", vendors);
app.use("/api/departments", departments);
app.use("/api/laptops", laptops);


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));