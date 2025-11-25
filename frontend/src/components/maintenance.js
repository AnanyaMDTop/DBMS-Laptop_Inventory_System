import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Maintenance() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    laptop_id: "",
    vendor_id: "",
    issue_description: "",
    maintenance_date: "",
    status: ""
  });

  const load = async () => {
    try {
      const res = await api.get("/maintenance");
      setList(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load maintenance records");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    try {
      await api.post("/maintenance", form);
      setForm({ laptop_id: "", vendor_id: "", issue_description: "", maintenance_date: "", status: "" });
      load();
    } catch (err) {
      console.error(err);
      alert("Error adding maintenance record");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete maintenance record?")) return;
    try {
      await api.delete(`/maintenance/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Error deleting record");
    }
  };

  return (
    <div className="card">
      <h4>Maintenance Records</h4>

      <div style={{ marginBottom: 12 }}>
        <div className="form-row">

          <input
            placeholder="Laptop ID"
            className="small-input"
            value={form.laptop_id}
            onChange={e => setForm({ ...form, laptop_id: e.target.value })}
          />
          <input
            placeholder="Vendor ID"
            className="small-input"
            value={form.vendor_id}
            onChange={e => setForm({ ...form, vendor_id: e.target.value })}
          />
          <input
            placeholder="Issue"
            className="small-input"
            value={form.issue_description}
            onChange={e => setForm({ ...form, issue_description: e.target.value })}
          />
          <input
            type="date"
            className="small-input"
            value={form.maintenance_date}
            onChange={e => setForm({ ...form, maintenance_date: e.target.value })}
          />
          <input
            placeholder="Status"
            className="small-input"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          />

          <button className="btn-primary" onClick={submit}>Add</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Laptop</th>
            <th>Vendor</th>
            <th>Issue Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.laptop_id}</td>
              <td>{m.vendor_id}</td>
              <td>{m.issue_description}</td>
              <td>{m.maintenance_date ?? "—"}</td>
              <td>{m.status}</td>
              <td>
                <button className="btn-danger" onClick={() => remove(m.id)}>
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
