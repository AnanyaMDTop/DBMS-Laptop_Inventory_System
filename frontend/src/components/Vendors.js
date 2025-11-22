import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Vendors() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ vendor_name: "", contact: "", address: "" });

  const load = async () => {
    try {
      const res = await api.get("/vendors");
      setList(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load vendors");
    }
  };

  useEffect(()=>{ load(); }, []);

  const submit = async () => {
    try {
      await api.post("/vendors", form);
      setForm({ vendor_name: "", contact: "", address: "" });
      load();
    } catch (err) { console.error(err); alert("Failed"); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete vendor?")) return;
    try {
      await api.delete(`/vendors/${id}`);
      load();
    } catch (err) { console.error(err); alert("Failed (FK?)"); }
  };

  return (
    <div className="card">
      <h4>Vendors</h4>

      <div className="form-row" style={{ marginBottom: 12 }}>
        <input placeholder="Vendor name" className="small-input" value={form.vendor_name} onChange={e=>setForm({...form,vendor_name:e.target.value})} />
        <input placeholder="Contact" className="small-input" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} />
        <input
  placeholder="Address"
  value={form.address}
  onChange={e => setForm({ ...form, address: e.target.value })}
/>
        <button className="btn-primary" onClick={submit}>Add</button>
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Contact</th><th>Action</th></tr></thead>
        <tbody>
          {list.map(v=>(
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.vendor_name}</td>
              <td>{v.contact ?? "—"}</td>
              <td><button className="btn-danger" onClick={()=>remove(v.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
