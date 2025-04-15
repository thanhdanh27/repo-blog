import { Code } from "@mui/icons-material";
import "./SidebarAdmin.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";

export default function SidebarAdmin() {
  const { postId } = useParams(); // id sẽ có khi đang edit
  const location = useLocation();
  const pathAfterAdmin = location.pathname.split("/admin/")[1];
  console.log(pathAfterAdmin);

  const [activeIndex, setActiveIndex] = useState(""); // hoặc null nếu chưa chọn gì
  const menuItems = [
    { label: "HomePage", href: "/admin", tag: "" },
    { label: "Upload Post", href: "/admin/upload-post", tag: "upload-post" },
    { label: "Manager Posts", href: "/admin/manager", tag: "manager" },
  ];

  return (
    <>
      <div className="sidebar-header">
        <span>
          <Link to="/admin">Admin Dashboard</Link>
        </span>
      </div>
      <div className="features-wrap">
        <ul className="list-features">
          {menuItems.map((item, index) => (
            <li onClick={() => setActiveIndex(item.tag)} key={index}>
              <Link
                className={
                  (!postId && activeIndex === item.tag) ||
                  (postId && item.tag === "upload-post")
                    ? "active-item"
                    : ""
                }
                to={item.href}
              >
                <Code className="feature-icon" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
