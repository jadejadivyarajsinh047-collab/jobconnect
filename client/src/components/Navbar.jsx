import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Briefcase, LogOut, UserCircle, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const checkUnread = () => {
    api
      .get("/users/notifications")
      .then((r) => setUnreadCount(r.data.filter((n) => !n.read).length))
      .catch(() => {});
  };

  useEffect(() => {
    if (!user) return;
    checkUnread(); // check once immediately on login/page load
    const interval = setInterval(checkUnread, 15000); // then poll every 15s
    return () => clearInterval(interval);
  }, [user]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logoMark">
          <Briefcase size={19} />
        </span>
        Job<span className="accent">Connect</span>
      </Link>
      <div className="navMenu">
        <Link to="/jobs">Find Jobs</Link>
        {user?.role === "candidate" && (
          <Link to="/applications">Applications</Link>
        )}
        {user?.role === "candidate" && <Link to="/saved">Saved</Link>}
        {user?.role === "recruiter" && <Link to="/recruiter">Recruiter</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      </div>
      <div className="navRight">
        {user ? (
          <>
            <Link
              to="/notifications"
              className="notifBell"
              onClick={() => setUnreadCount(0)}
            >
              <Bell size={19} />
              {unreadCount > 0 && <span className="notifDot"></span>}
            </Link>
            <Link to="/profile" className="avatar">
              <UserCircle size={20} />
              {user.name.split(" ")[0]}
            </Link>
            <button
              className="iconBtn"
              onClick={async () => {
                await logout();
                nav("/");
              }}
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link className="primary small" to="/register">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}