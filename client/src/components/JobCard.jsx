import { Link } from "react-router-dom";
import { MapPin, Clock3, Bookmark } from "lucide-react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./jobCard.css";
export default function JobCard({ job }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const save = async () => {
    if (!user) return;
    const r = await api.post(`/jobs/${job._id}/save`);
    setSaved(r.data.saved);
  };
  return (
    <div className="jobCard">
      <div className="jobTop">
        <div className="companyLogo">{job.company?.[0] || "J"}</div>
        <button className="bookmark" onClick={save}>
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <Link to={`/jobs/${job._id}`}>
        <h3>{job.title}</h3>
      </Link>
      <p className="muted">{job.company}</p>
      <div className="jobMeta">
        <span>
          <MapPin size={15} />
          {job.location || "Remote"}
        </span>
        <span>
          <Clock3 size={15} />
          {job.jobType}
        </span>
      </div>
      <div className="chips">
        {(job.skills || []).slice(0, 4).map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="jobBottom">
        <b>
          {job.salaryMin
            ? `₹${job.salaryMin} - ₹${job.salaryMax || "LPA"}`
            : "Salary not disclosed"}
        </b>
        <span>{job.experience || "Fresher"}</span>
      </div>
    </div>
  );
}
