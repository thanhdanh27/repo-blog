import {
  Code,
  EditNote,
  Home,
  ManageAccounts,
  NoteAdd,
  PermContactCalendar,
  PersonAdd,
} from "@mui/icons-material";
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
    { label: "Trang chủ", href: "/admin", tag: "", icon: <Home /> },
    {
      label: "Đăng bài viết",
      href: "/admin/upload-post",
      tag: "upload-post",
      icon: <NoteAdd />,
    },
    {
      label: "Quản lý bài viết",
      href: "/admin/manager",
      tag: "manager",
      icon: <EditNote />,
    },
    {
      label: "Quản lý trang cá nhân",
      href: "/admin/manager-profile",
      tag: "manager-profile",
      icon: <ManageAccounts />,
    },
    {
      label: "Quản lý người dùng",
      href: "/admin/manager-user",
      tag: "manager-user",
      icon: <PersonAdd />,
    },
  ];

  const menuItemsUser = [
    { label: "Trang chủ", href: "/admin", tag: "", icon: <Home /> },
    {
      label: "Quản lý trang cá nhân",
      href: "/admin/manager-profile",
      tag: "manager-profile",
      icon: <ManageAccounts />,
    },
  ];
  // console.log(role);

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
                  {item.icon}
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
