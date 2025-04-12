import { Code } from "@mui/icons-material";
import "./SidebarAdmin.scss";

export default function SidebarAdmin() {
  return (
    <>
      <div className="sidebar-header">
        <span>Admin Dashboard</span>
      </div>
      <div className="features-wrap">
        <ul className="list-features">
          <li className="active-item">
            <Code className="feature-icon" />
            <span>Feature 1</span>
          </li>

          <li>
            <Code className="feature-icon" />
            <span>Feature 1</span>
          </li>
          <li>
            <Code className="feature-icon" />
            <span>Feature 1</span>
          </li>
          <li>
            <Code className="feature-icon" />
            <span>Feature 1</span>
          </li>

          <li>
            <Code className="feature-icon" />
            <span>Feature 1</span>
          </li>
        </ul>
      </div>
    </>
  );
}
