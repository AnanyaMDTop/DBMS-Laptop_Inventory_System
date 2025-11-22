import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Departments() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ department_name: "" });

  const load = async () => {
    try {
      const res = await api.get("/departments");
      setList(res.data);
    } catch (err) { console.error(err); alert("Failed to load"); }
  };

  useEffect(()=>{ load(); }, []);

  const submit = async () => {
    try {
      await api.post("/departments", form);
      setForm({ department_name: "" });
      load();
    } catch (err) { console.error(err); alert("Failed"); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete department?")) return;
    try {
      await api.delete(`/departments/${id}`);
      load();
    } catch (err) { console.error(err); alert("Failed (FK?)"); }
  };

  return (
    <div className="card">
      <h4>Departments</h4>

      <div className="form-row" style={{ marginBottom: 12 }}>
        <input placeholder="Department name" className="small-input" value={form.department_name} onChange={e=>setForm({ department_name: e.target.value })} />
        <button className="btn-primary" onClick={submit}>Add</button>
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Action</th></tr></thead>
        <tbody>
          {list.map(d=>(
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.department_name}</td>
              <td><button className="btn-danger" onClick={()=>remove(d.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
