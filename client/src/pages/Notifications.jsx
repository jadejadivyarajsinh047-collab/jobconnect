import { useEffect, useState } from "react";
import api from "../api";
import "./Notifications.css";
export default function Notifications() {
  const [n, setN] = useState([]);
  useEffect(() => {
    api.get("/users/notifications").then((r) => setN(r.data));
    api.patch("/users/notifications/read");
  }, []);
  return (
    <main className="content narrow">
      <div className="pageTitle">
        <span className="eyebrow">UPDATES</span>
        <h1>Notifications</h1>
      </div>
      {n.map((x) => (
        <div
          className={"notification " + (!x.read ? "unread" : "")}
          key={x._id}
        >
          <b>{x.title}</b>
          <p>{x.message}</p>
          <small>{new Date(x.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </main>
  );
}
