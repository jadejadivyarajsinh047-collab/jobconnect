import { Link } from "react-router-dom";
import { Search, ArrowRight, Users, Building2, TrendingUp } from "lucide-react";
import "./Home.css";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="heroContent">
          <span className="eyebrow">✦ THE SMARTER WAY TO GET HIRED</span>
          <h1>
            Find work that
            <br />
            <span>works for you.</span>
          </h1>
          <p>
            Discover opportunities from growing companies and build the career
            you deserve.
          </p>
          <div className="heroActions">
            <Link className="primary" to="/jobs">
              <Search size={18} /> Explore Jobs
            </Link>
            <Link className="secondary" to="/register">
              Create Profile <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="heroVisual">
          <div className="floatCard cardOne">
            <span className="miniIcon">✓</span>
            <div>
              <b>Application Sent</b>
              <small>Frontend Developer</small>
            </div>
          </div>
          <div className="orb">
            <div className="orbInner">JC</div>
          </div>
          <div className="floatCard cardTwo">
            <b>12,480+</b>
            <small>Open opportunities</small>
          </div>
        </div>
      </section>
      <section className="stats">
        <div>
          <Users />
          <b>50K+</b>
          <span>Job Seekers</span>
        </div>
        <div>
          <Building2 />
          <b>2.5K+</b>
          <span>Companies</span>
        </div>
        <div>
          <TrendingUp />
          <b>12K+</b>
          <span>Jobs Posted</span>
        </div>
      </section>
      <section className="homeSection">
        <div className="sectionTitle">
          <div>
            <span className="eyebrow">EXPLORE</span>
            <h2>Everything you need to move forward.</h2>
          </div>
        </div>
        <div className="featureGrid">
          <div>
            <b>01</b>
            <h3>Find the right role</h3>
            <p>
              Powerful search and filters help you discover jobs matching your
              skills, experience and goals.
            </p>
          </div>
          <div>
            <b>02</b>
            <h3>Build your profile</h3>
            <p>
              Show recruiters your skills, experience and resume with a
              professional candidate profile.
            </p>
          </div>
          <div>
            <b>03</b>
            <h3>Track your journey</h3>
            <p>
              Apply once and follow every application from Applied to Interview
              to Selected.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
