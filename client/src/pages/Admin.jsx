import { useEffect, useState } from "react";
import "./Admin.css";
import api from "../api";
export default function Admin() {
  const [d, setD] = useState({}),
    [u, setU] = useState([]);
  const load = () => {
    api.get("/admin/dashboard").then((r) => setD(r.data));
    api.get("/admin/users").then((r) => setU(r.data));
  };
  useEffect(load, []);
  const del = async (id) => {
    if (confirm("Delete this user?")) {
      await api.delete("/admin/users/" + id);
      load();
    }
  };
  return (
    <main className="content">
      <div className="pageTitle">
        <span className="eyebrow">ADMIN CONTROL</span>
        <h1>Platform overview.</h1>
      </div>
      <div className="metricGrid">
        <div>
          <b>{d.users || 0}</b>
          <span>Total users</span>
        </div>
        <div>
          <b>{d.jobs || 0}</b>
          <span>Active jobs</span>
        </div>
        <div>
          <b>{d.applications || 0}</b>
          <span>Applications</span>
        </div>
        <div>
          <b>{d.recruiters || 0}</b>
          <span>Recruiters</span>
        </div>
      </div>
      <section className="dashSection">
        <h2>Users</h2>
        {u.map((x) => (
          <div className="candidateRow" key={x._id}>
            <div className="profileAvatar small">{x.name?.[0]}</div>
            <div>
              <b>{x.name}</b>
              <p>{x.email}</p>
            </div>
            <span className="status">{x.role}</span>
            <button className="danger" onClick={() => del(x._id)}>
              Delete
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
