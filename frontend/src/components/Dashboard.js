import React, { useState } from "react";
import Employees from "./Employees";
import Vendors from "./Vendors";
import Departments from "./Departments";
import Laptops from "./Laptops";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-container">
      <div className="header">
        <h1>Inventory Admin Dashboard</h1>
        <div>
          <small>Backend: http://localhost:5000</small>
        </div>
      </div>

      <div className="menu">
        <button className="btn btn-outline-secondary" onClick={() => setPage("employees")}>Employees</button>
        <button className="btn btn-outline-secondary" onClick={() => setPage("vendors")}>Vendors</button>
        <button className="btn btn-outline-secondary" onClick={() => setPage("departments")}>Departments</button>
        <button className="btn btn-outline-secondary" onClick={() => setPage("laptops")}>Laptops</button>
        <button className="btn btn-outline-secondary" onClick={() => setPage("dashboard")}>Overview</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {page === "dashboard" && (
          <div className="card">
            <h3>Welcome — select a module to manage</h3>
            <p>Use the buttons above to manage Employees, Vendors, Departments and Laptops.</p>
          </div>
        )}
        {page === "employees" && <Employees />}
        {page === "vendors" && <Vendors />}
        {page === "departments" && <Departments />}
        {page === "laptops" && <Laptops />}
      </div>
    </div>
  );
}
