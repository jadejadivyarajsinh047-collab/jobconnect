import { useEffect, useState } from "react";
import api from "../api";
import JobCard from "../components/JobCard";
export default function Saved() {
  const [j, setJ] = useState([]);
  useEffect(() => {
    api.get("/jobs/saved").then((r) => setJ(r.data));
  }, []);
  return (
    <main className="content">
      <div className="pageTitle">
        <span className="eyebrow">BOOKMARKS</span>
        <h1>Saved Jobs</h1>
        <p>Jobs you want to come back to.</p>
      </div>
      <div className="jobsGrid">
        {j.map((x) => (
          <JobCard key={x._id} job={x} />
        ))}
      </div>
    </main>
  );
}
