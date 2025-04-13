import { Code } from "@mui/icons-material";
import "./SidebarAdmin.scss";
import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <>
      <div className="sidebar-header">
        <span>
          <Link to="/admin">Admin Dashboard</Link>
        </span>
      </div>
      <div className="features-wrap">
        <ul className="list-features">
          <li>
            <Link className="active-item" to="/admin/edit">
              <Code className="feature-icon" />
              <span>Upload Post</span>
            </Link>
          </li>

          <li>
            <Link to="#">
              <Code className="feature-icon" />
              <span>Feature 1</span>
            </Link>
          </li>

          <li>
            <Link to="#">
              <Code className="feature-icon" />
              <span>Feature 1</span>
            </Link>
          </li>

          <li>
            <Link to="#">
              <Code className="feature-icon" />
              <span>Feature 1</span>
            </Link>
          </li>

          <li>
            <Link to="#">
              <Code className="feature-icon" />
              <span>Feature 1</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
