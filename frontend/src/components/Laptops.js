import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Laptops() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ model:"", brand:"", serial_no:"", employee_id:"", vendor_id:"", status:"Available" });

  const load = async () => {
    try {
      const res = await api.get("/laptops");
      setList(res.data);
    } catch (err) { console.error(err); alert("Failed to load laptops"); }
  };

  useEffect(()=>{ load(); }, []);

  const submit = async () => {
    try {
      // convert empty strings to null for FK fields
      const payload = { ...form, employee_id: form.employee_id || null, vendor_id: form.vendor_id || null };
      await api.post("/laptops", payload);
      setForm({ model:"", brand:"", serial_no:"", employee_id:"", vendor_id:"", status:"Available" });
      load();
    } catch (err) {
      console.error(err);
      // show helpful message if FK error
      const msg = err?.response?.data?.sqlMessage || err?.message || "Failed to add laptop";
      alert("Error: " + msg);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this laptop?")) return;
    try {
      await api.delete(`/laptops/${id}`);
      load();
    } catch (err) { console.error(err); alert("Failed to delete laptop"); }
  };

  return (
    <div className="card">
      <h4>Laptops</h4>

      <div style={{ marginBottom: 12 }}>
        <div className="form-row">
          <input placeholder="Model" className="small-input" value={form.model} onChange={e=>setForm({...form, model:e.target.value})} />
          <input placeholder="Brand" className="small-input" value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} />
          <input placeholder="Serial No" className="small-input" value={form.serial_no} onChange={e=>setForm({...form, serial_no:e.target.value})} />
        </div>

        <div className="form-row">
          <input placeholder="Employee ID (optional)" className="small-input" value={form.employee_id} onChange={e=>setForm({...form, employee_id:e.target.value})} />
          <input placeholder="Vendor ID (optional)" className="small-input" value={form.vendor_id} onChange={e=>setForm({...form, vendor_id:e.target.value})} />

          <select className="small-input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
            <option>Available</option>
            <option>Assigned</option>
            <option>Under Maintenance</option>
          </select>

          <button className="btn-primary" onClick={submit}>Add</button>
        </div>
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Model</th><th>Brand</th><th>Serial</th><th>Employee</th><th>Vendor</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {list.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.model}</td>
              <td>{l.brand}</td>
              <td>{l.serial_no}</td>
              <td>{l.employee_id ?? "—"}</td>
              <td>{l.vendor_id ?? "—"}</td>
              <td className={`status-${l.status}`}>{l.status}</td>
              <td><button className="btn-danger" onClick={()=>remove(l.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
