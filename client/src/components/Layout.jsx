import Navbar from "./Navbar";
import "./Layout.css";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="page">{children}</div>
      <footer>
        <div>
          <b>JobConnect</b>
          <p>Helping talent find meaningful careers.</p>
        </div>
        <div>Built with MERN Stack · Placement Portfolio Project</div>
      </footer>
    </>
  );
}
