import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Employees() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", department_id: "", email: "" });

  const load = async () => {
    try {
      const res = await api.get("/employees");
      setList(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load employees");
    }
  };

  useEffect(() => { load(); }, []);
 console.log(form);
  const submit = async () => {
    try {
      await api.post("/employees", form);
      setForm({ name: "", department_id: "", email: "" });
      load();
    } catch (err) {
      console.error(err);
      alert("Error adding employee. See console.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Error deleting employee (possible FK constraint).");
    }
  };

  return (
    <div className="card">
      <h4>Employees</h4>

      <div style={{ marginBottom: 12 }}>
        <div className="form-row">
          <input placeholder="Name" className="small-input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input placeholder="Department ID" className="small-input" value={form.department_id} onChange={e=>setForm({...form, department_id:e.target.value})} />
         <input
  placeholder="Email"
  value={form.email}
  onChange={e => setForm({ ...form, email: e.target.value })}
/>
          <button className="btn-primary" onClick={submit}>Add</button>
        </div>
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Dept</th><th>Email</th><th>Action</th></tr></thead>
        <tbody>
          {list.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.department_id ?? "—"}</td>
              <td>{e.email ?? "—"}</td>
              <td><button className="btn-danger" onClick={()=>remove(e.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
