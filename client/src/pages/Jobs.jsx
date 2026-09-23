import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import api from "../api";
import JobCard from "../components/JobCard";
import "./Jobs.css";
export default function Jobs() {
  const [jobs, setJobs] = useState([]),
    [filters, setFilters] = useState({
      search: "",
      location: "",
      jobType: "",
      experience: "",
    }),
    [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);
    api
      .get("/jobs", { params: filters })
      .then((r) => setJobs(r.data.jobs))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  return (
    <main className="content">
      <div className="jobsHero">
        <span className="eyebrow">OPPORTUNITIES</span>
        <h1>Find your next opportunity.</h1>
        <p>Search thousands of roles from companies hiring now.</p>
      </div>
      <div className="filterBar">
        <div className="searchBox">
          <Search size={19} />
          <input
            placeholder="Job title, skill or company"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <select
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
        >
          <option value="">All job types</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
          <option>Contract</option>
          <option>Remote</option>
        </select>
        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
        >
          <option value="">Experience</option>
          <option>Fresher</option>
          <option>0-2 Years</option>
          <option>2-5 Years</option>
        </select>
        <button className="primary" onClick={load}>
          <SlidersHorizontal size={17} /> Search
        </button>
      </div>
      <div className="jobCount">{jobs.length} opportunities</div>
      <div className="jobsGrid">
        {loading ? (
          <div className="loader">Loading jobs...</div>
        ) : (
          jobs.map((j) => <JobCard key={j._id} job={j} />)
        )}
      </div>
    </main>
  );
}
