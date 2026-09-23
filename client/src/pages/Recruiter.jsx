import { useEffect, useState } from "react";
import { Briefcase, Users, Plus } from "lucide-react";
import "./Recruiter.css";
import api from "../api";
export default function Recruiter() {
  const [jobs, setJobs] = useState([]),
    [apps, setApps] = useState([]),
    [show, setShow] = useState(false),
    [f, setF] = useState({
      title: "",
      company: "",
      location: "",
      salaryMin: "",
      salaryMax: "",
      jobType: "Full Time",
      experience: "Fresher",
      category: "Software Development",
      skills: "",
      description: "",
    });
  const load = () => {
    api.get("/jobs/mine").then((r) => setJobs(r.data));
    api.get("/applications/recruiter").then((r) => setApps(r.data));
  };
  useEffect(load, []);
  const add = async (e) => {
    e.preventDefault();
    await api.post("/jobs", {
      ...f,
      salaryMin: Number(f.salaryMin) || undefined,
      salaryMax: Number(f.salaryMax) || undefined,
      skills: f.skills
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    });
    setShow(false);
    setF({ ...f, title: "", description: "", skills: "" });
    load();
  };
  const status = async (id, s) => {
    await api.patch(`/applications/${id}`, { status: s });
    load();
  };
  return (
    <main className="content">
      <div className="dashboardHead">
        <div>
          <span className="eyebrow">RECRUITER CENTER</span>
          <h1>Grow your team.</h1>
          <p>Manage jobs and candidates from one place.</p>
        </div>
        <button className="primary" onClick={() => setShow(!show)}>
          <Plus /> Post a job
        </button>
      </div>
      <div className="metricGrid">
        <div>
          <Briefcase />
          <b>{jobs.length}</b>
          <span>Active jobs</span>
        </div>
        <div>
          <Users />
          <b>{apps.length}</b>
          <span>Applicants</span>
        </div>
        <div>
          <Users />
          <b>{apps.filter((x) => x.status === "Shortlisted").length}</b>
          <span>Shortlisted</span>
        </div>
      </div>
      {show && (
        <form className="jobForm" onSubmit={add}>
          <h2>Post a new job</h2>
          <div className="formGrid">
            <input
              required
              placeholder="Job title"
              value={f.title}
              onChange={(e) => setF({ ...f, title: e.target.value })}
            />
            <input
              required
              placeholder="Company"
              value={f.company}
              onChange={(e) => setF({ ...f, company: e.target.value })}
            />
            <input
              placeholder="Location"
              value={f.location}
              onChange={(e) => setF({ ...f, location: e.target.value })}
            />
            <input
              placeholder="Skills: React, Node, MongoDB"
              value={f.skills}
              onChange={(e) => setF({ ...f, skills: e.target.value })}
            />
            <input
              placeholder="Min salary LPA"
              value={f.salaryMin}
              onChange={(e) => setF({ ...f, salaryMin: e.target.value })}
            />
            <input
              placeholder="Max salary LPA"
              value={f.salaryMax}
              onChange={(e) => setF({ ...f, salaryMax: e.target.value })}
            />
            <select
              value={f.jobType}
              onChange={(e) => setF({ ...f, jobType: e.target.value })}
            >
              <option>Full Time</option>
              <option>Internship</option>
              <option>Remote</option>
              <option>Contract</option>
            </select>
            <select
              value={f.experience}
              onChange={(e) => setF({ ...f, experience: e.target.value })}
            >
              <option>Fresher</option>
              <option>0-2 Years</option>
              <option>2-5 Years</option>
            </select>
          </div>
          <textarea
            required
            placeholder="Detailed job description..."
            value={f.description}
            onChange={(e) => setF({ ...f, description: e.target.value })}
          />
          <button className="primary">Publish job</button>
        </form>
      )}
      <section className="dashSection">
        <h2>Recent applicants</h2>
        {apps.slice(0, 10).map((a) => (
          <div className="candidateRow" key={a._id}>
            <div className="profileAvatar small">{a.candidate?.name?.[0]}</div>
            <div>
              <b>{a.candidate?.name}</b>
              <p>
                {a.candidate?.email} · {a.job?.title}
              </p>
            </div>
            <select
              value={a.status}
              onChange={(e) => status(a._id, e.target.value)}
            >
              {[
                "Applied",
                "Under Review",
                "Shortlisted",
                "Interview",
                "Selected",
                "Rejected",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        ))}
      </section>
      <section className="dashSection">
        <h2>Your jobs</h2>
        {jobs.map((j) => (
          <div className="candidateRow" key={j._id}>
            <div className="companyLogo">
              <Briefcase />
            </div>
            <div>
              <b>{j.title}</b>
              <p>
                {j.company} · {j.location}
              </p>
            </div>
            <span className="status">{j.jobType}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
