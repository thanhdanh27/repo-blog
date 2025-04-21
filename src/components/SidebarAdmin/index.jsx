import { Code } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import "./SidebarAdmin.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SidebarAdmin() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken.accessToken);

        setRole(decoded.Role);
      } catch (err) {
        console.error("Lỗi khi decode token:", err);
      }
    }
  }, []);

  const { postId } = useParams(); // id sẽ có khi đang edit

  const [activeIndex, setActiveIndex] = useState(""); // hoặc null nếu chưa chọn gì
  const menuItemsAdmin = [
    { label: "Trang chủ", href: "/admin", tag: "" },
    { label: "Đăng bài viết", href: "/admin/upload-post", tag: "upload-post" },
    { label: "Quản lý bài viết", href: "/admin/manager", tag: "manager" },
    {
      label: "Quản lý trang cá nhân",
      href: "/admin/manager-profile",
      tag: "manager-profile",
    },
  ];

  const menuItemsUser = [
    { label: "Trang chủ", href: "/admin", tag: "" },
    {
      label: "Quản lý trang cá nhân",
      href: "/admin/manager-profile",
      tag: "manager-profile",
    },
  ];
  console.log(role);

  return (
    <>
      <div className="sidebar-header">
        <span>
          <Link to="/admin">Admin Dashboard</Link>
        </span>
      </div>
      <div className="features-wrap">
        <ul className="list-features">
          {role === "Admin" &&
            menuItemsAdmin.map((item, index) => (
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

          {role === undefined &&
            menuItemsUser.map((item, index) => (
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
