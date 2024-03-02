import { Link } from "react-router-dom";
import Home from "../sections/Home";

export default function DashHeader() {
  return (
    <header className="dash-head">
      <div className="first-div" style={{ color: "rgb(40,39,39)" }}>
        <h1>
          S<span>t</span>o<span>r</span>e
        </h1>
      </div>
      <div className="second-div">
        <Link
          to="/"
          element={<Home />}
          style={{ padding: "10px", width: "200px" }}
        >
          Go To Home
        </Link>
      </div>
    </header>
  );
}
