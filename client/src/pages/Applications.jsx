import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ChevronRight } from "lucide-react";
import api from "../api";
import "./Applications.css";
const statuses = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
];
export default function Applications() {
  const [a, setA] = useState([]);
  useEffect(() => {
    api.get("/applications/mine").then((r) => setA(r.data));
  }, []);
  return (
    <main className="content narrow">
      <div className="pageTitle">
        <span className="eyebrow">YOUR JOURNEY</span>
        <h1>My Applications</h1>
        <p>Keep track of every opportunity you've applied for.</p>
      </div>
      {a.length ? (
        a.map((x) => (
          <div className="applicationCard" key={x._id}>
            <div className="companyLogo">
              <Briefcase />
            </div>
            <div className="appInfo">
              <Link to={`/jobs/${x.job?._id}`}>
                <h3>{x.job?.title}</h3>
              </Link>
              <p>
                {x.job?.company} · {x.job?.location}
              </p>
              <div className="progress">
                {statuses.map((s, i) => (
                  <span
                    className={statuses.indexOf(x.status) >= i ? "done" : ""}
                    key={s}
                  >
                    <i></i>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <b className={"status " + x.status.toLowerCase().replace(" ", "-")}>
              {x.status}
            </b>
            <ChevronRight />
          </div>
        ))
      ) : (
        <div className="emptyState">
          <h2>No applications yet</h2>
          <p>Start exploring jobs and apply to roles you love.</p>
          <Link className="primary" to="/jobs">
            Find Jobs
          </Link>
        </div>
      )}
    </main>
  );
}
