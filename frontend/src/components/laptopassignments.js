import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function LaptopAssignments() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    laptop_id: "",
    employee_id: "",
    assigned_date: "",
    returned_date: ""
  });

  const load = async () => {
    try {
      const res = await api.get("/laptopAssignments");
      setList(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load assignments");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    try {
      await api.post("/laptopAssignments", form);
      setForm({ laptop_id: "", employee_id: "", assigned_date: "", returned_date: "" });
      load();
    } catch (err) {
      console.error(err);
      alert("Error adding assignment");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;
    try {
      await api.delete(`/laptopAssignments/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Error deleting assignment");
    }
  };

  return (
    <div className="card">
      <h4>Laptop Assignments</h4>

      <div style={{ marginBottom: 12 }}>
        <div className="form-row">
          <input
            placeholder="Laptop ID"
            className="small-input"
            value={form.laptop_id}
            onChange={e => setForm({ ...form, laptop_id: e.target.value })}
          />
          <input
            placeholder="Employee ID"
            className="small-input"
            value={form.employee_id}
            onChange={e => setForm({ ...form, employee_id: e.target.value })}
          />
          <input
            type="date"
            className="small-input"
            value={form.assigned_date}
            onChange={e => setForm({ ...form, assigned_date: e.target.value })}
          />
          <input
            type="date"
            className="small-input"
            value={form.returned_date}
            onChange={e => setForm({ ...form, returned_date: e.target.value })}
          />

          <button className="btn-primary" onClick={submit}>Add</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Laptop</th>
            <th>Employee</th>
            <th>Assigned Date</th>
            <th>Returned Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.laptop_id}</td>
              <td>{a.employee_id}</td>
              <td>{a.assigned_date ?? "—"}</td>
              <td>{a.returned_date ?? "—"}</td>
              <td>
                <button className="btn-danger" onClick={() => remove(a.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
