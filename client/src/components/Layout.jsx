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
        <div>job connect for best opportunities</div>
      </footer>
    </>
  );
}
