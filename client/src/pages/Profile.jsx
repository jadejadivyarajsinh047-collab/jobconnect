import { useEffect, useState } from "react";
import "./Profile.css";
import api from "../api";
export default function Profile() {
  const [p, setP] = useState({});
  const [save, setSave] = useState("");
  useEffect(() => {
    api.get("/users/profile").then((r) => setP(r.data));
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    await api.put("/users/profile", {
      ...p,
      skills:
        typeof p.skills === "string"
          ? p.skills.split(",").map((x) => x.trim())
          : p.skills,
    });
    setSave("Profile updated ✓");
  };
  return (
    <main className="content narrow">
      <div className="pageTitle">
        <span className="eyebrow">YOUR PROFILE</span>
        <h1>Build your professional identity.</h1>
      </div>
      <form className="profileForm" onSubmit={submit}>
        <div className="profileAvatar">{p.name?.[0] || "U"}</div>
        <label>
          Full name
          <input
            value={p.name || ""}
            onChange={(e) => setP({ ...p, name: e.target.value })}
          />
        </label>
        <label>
          Headline
          <input
            placeholder="e.g. Full Stack Developer"
            value={p.headline || ""}
            onChange={(e) => setP({ ...p, headline: e.target.value })}
          />
        </label>
        <label>
          Location
          <input
            value={p.location || ""}
            onChange={(e) => setP({ ...p, location: e.target.value })}
          />
        </label>
        <label>
          Skills
          <input
            value={
              Array.isArray(p.skills) ? p.skills.join(", ") : p.skills || ""
            }
            onChange={(e) => setP({ ...p, skills: e.target.value })}
          />
        </label>
        <label>
          Resume URL
          <input
            placeholder="https://..."
            value={p.resumeUrl || ""}
            onChange={(e) => setP({ ...p, resumeUrl: e.target.value })}
          />
        </label>
        <label>
          About you
          <textarea
            value={p.bio || ""}
            onChange={(e) => setP({ ...p, bio: e.target.value })}
          />
        </label>
        <button className="primary">Save changes</button>
        {save && <span className="success">{save}</span>}
      </form>
    </main>
  );
}
