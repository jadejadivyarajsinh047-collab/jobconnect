import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Clock3, ArrowLeft, CheckCircle2 } from "lucide-react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import "./JobDetails.css";
export default function JobDetails() {
  const { id } = useParams();
  const [j, setJ] = useState(null);
  const { user } = useAuth();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    api.get(`/jobs/${id}`).then((r) => setJ(r.data));
  }, [id]);
  if (!j) return <div className="loader">Loading job...</div>;
  const apply = async () => {
    if (!user) return setMsg("Please login as a candidate.");
    try {
      await api.post(`/applications/${id}`, {});
      setMsg("Application submitted successfully!");
    } catch (e) {
      setMsg(e.response?.data?.message || "Unable to apply");
    }
  };
  return (
    <main className="content detail">
      <Link to="/jobs" className="back">
        <ArrowLeft size={16} /> Back to jobs
      </Link>
      <div className="detailGrid">
        <article className="detailMain">
          <div className="companyHero">
            <div className="companyLogo big">{j.company?.[0]}</div>
            <div>
              <h1>{j.title}</h1>
              <p>{j.company}</p>
            </div>
          </div>
          <div className="detailTags">
            <span>
              <MapPin /> {j.location || "Remote"}
            </span>
            <span>
              <Clock3 /> {j.jobType}
            </span>
            <span>◈ {j.experience}</span>
          </div>
          <hr />
          <h2>About the role</h2>
          <p className="description">{j.description}</p>
          <h2>Skills & qualifications</h2>
          <div className="chips large">
            {j.skills?.map((s) => (
              <span key={s}>
                <CheckCircle2 size={14} />
                {s}
              </span>
            ))}
          </div>
        </article>
        <aside className="applyBox">
          <h3>Ready to apply?</h3>
          <p>Take the next step toward your career.</p>
          <button className="primary full" onClick={apply}>
            Apply for this job
          </button>
          {msg && <div className="notice">{msg}</div>}
          <div className="sideInfo">
            <b>About the company</b>
            <p>{j.company} is hiring talented people to grow with the team.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
