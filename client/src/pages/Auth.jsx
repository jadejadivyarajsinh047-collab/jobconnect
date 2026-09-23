import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";
export default function Auth({ register = false }) {
  const { login, register: signup } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    company: "",
  });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      register ? await signup(f) : await login(f);
      nav("/");
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="authPage">
      <div className="authBrand">
        <Link to="/" className="logo">
          <span className="logoMark">
            <Briefcase />
          </span>
          Job<span className="accent">Connect</span>
        </Link>
        <h1>{register ? "Start your career journey." : "Welcome back."}</h1>
        <p>Connect with opportunities that match your ambition.</p>
      </div>
      <form className="authForm" onSubmit={submit}>
        <h2>{register ? "Create your account" : "Sign in to JobConnect"}</h2>
        <p className="muted">
          {register
            ? "Join thousands of professionals finding better work."
            : "Enter your details to continue."}
        </p>
        {error && <div className="error">{error}</div>}
        {register && (
          <input
            required
            placeholder="Full name"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
          />
        )}
        <input
          required
          type="email"
          placeholder="Email address"
          value={f.email}
          onChange={(e) => setF({ ...f, email: e.target.value })}
        />
        <div className="password">
          <input
            required
            type={show ? "text" : "password"}
            placeholder="Password"
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
          />
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {register && (
          <>
            <label>Account type</label>
            <select
              value={f.role}
              onChange={(e) => setF({ ...f, role: e.target.value })}
            >
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
            </select>
            {f.role === "recruiter" && (
              <input
                required
                placeholder="Company name"
                value={f.company}
                onChange={(e) => setF({ ...f, company: e.target.value })}
              />
            )}
          </>
        )}
        <button className="primary full">
          {register ? "Create account" : "Sign in"}
        </button>
        <p className="switch">
          {register ? "Already have an account? " : "New to JobConnect? "}
          <Link to={register ? "/login" : "/register"}>
            {register ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </form>
    </div>
  );
}
